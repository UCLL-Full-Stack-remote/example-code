import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserService from "@services/UserService";
import { StatusMessage } from "@types";

const UserLoginForm: React.FC = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const router = useRouter();

    const clearErrors = () => {
        setNameError(null);
        setPasswordError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!name && name.trim() === "") {
            setNameError("Name is required");
            result = false;
        }

        if (!password && password.trim() === "") {
            setPasswordError("Password is required");
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }

        const user = {
            username: name,
            password,
        };

        const response = await UserService.loginUser(user);
        if (response.status === 200) {
            setStatusMessages([
                {
                    message: `Login succesful. Redirecting to homepage...`,
                    type: "success",
                },
            ]);
            const user = await response.json();
            sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify({
                    token: user.token,
                    fullname: user.fullname,
                    username: user.username,
                    role: user.role,
                })
            );
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else if (response.status === 401) {
            const { errorMessage } = await response.json();
            setStatusMessages([{ message: errorMessage, type: "error" }]);
        } else {
            setStatusMessages([
                { message: "Something went wrong", type: "error" },
            ]);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <h3 className="mb-4 mt-4 col-md-1 offset-md-4">Login</h3>
            </div>
            {statusMessages && (
                <div className="row">
                    <ul className="list-unstyled mb-3 mx-auto col-md-4">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    "text-danger": type === "error",
                                    "text-success": type === "success",
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-1 offset-md-4">
                        <label htmlFor="nameInput">Username:</label>
                    </div>
                    <div className="col-md-3">
                        <input
                            id="nameInput"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        {nameError && (
                            <div className="text-danger">{nameError}</div>
                        )}
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-1 offset-md-4">
                        <label htmlFor="passwordInput">Password:</label>
                    </div>
                    <div className="col-md-3">
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                        />
                        {passwordError && (
                            <div className="text-danger">{passwordError}</div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <button
                        className="btn btn-primary mt-3 col-md-1 offset-md-4"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserLoginForm;
