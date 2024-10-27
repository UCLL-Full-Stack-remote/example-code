import classNames from "classnames";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import UserService from "../../services/UserService";
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
        <div className="max-w-sm m-auto">
            <div>
                <h3 className="px-0">Login</h3>
            </div>
            {statusMessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto ">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    " text-red-800": type === "error",
                                    "text-green-800": type === "success",
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div >
                    <div >
                        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">Username:</label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="nameInput"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                            data-testid="name-login"
                        />
                        {nameError && (
                            <div className="text-red-800 ">{nameError}</div>
                        )}
                    </div>
                </div>
                <div className="mt-2">
                    <div >
                        <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">Password:</label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                            data-testid="password-login"
                        />
                        {passwordError && (
                            <div className=" text-red-800">{passwordError}</div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
