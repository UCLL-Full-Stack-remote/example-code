import classNames from "classnames";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { StatusMessage } from "@types";
import router from "next/router";

const UserLoginFormSimple: React.FC = () => {
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([])
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(null);
    const [password, setPassword] = useState("");

    const valid = (): boolean => {
        let result = true;

        if (name.trim() === "") {
            setNameError("Name is required")
            console.log("IF")
            result = false;
        }

        return result
    }

    const clearErrors = () => {
        setNameError(null)
        setStatusMessages(null)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        clearErrors()
        console.log(statusMessages)

        if (! valid()) {
            return
        }

        const user = {
            username: name,
            password,
        }

        const response = await UserService.loginUser(user)
        if (response.status === 200) {
            console.log(200)
            let temp = statusMessages
            temp.push({message: 'Login succesful. Redirecting to homepage...',type: "success"})
            setStatusMessages(temp)
            // setStatusMessages({message: 'Login succesful. Redirecting to homepage...',type: "success"})
        } 
        else if (response.status === 401) {
            const { errorMessage } = await response.json()
            // setStatusMessages({ message: errorMessage, type: "error" })
        } 
        else {
            console.log('other error')
            console.log(statusMessages)
            let temp = statusMessages
            temp.push({ message: "Something went wrong", type: "error" })
            setStatusMessages(temp)
        }
        console.log(statusMessages)
    }

    return (
        <div className="max-w-sm m-auto">
            <div>
                <h3 data-testid="page-login" className="px-0">Login</h3>
            </div>
            {statusMessages && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto ">
                    <p>{statusMessages.length}</p>
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
            <form data-testid="form-login" onSubmit={handleSubmit}>
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
                    </div>
                </div>
                {nameError && (
                            <div className="text-red-800 ">{nameError}</div>
                )}
                <div className="mt-2">
                    <div >
                        <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">Password:</label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="passwordInput"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
                            data-testid="password-login"
                        />
                    </div>
                </div>
                <div className="row">
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                        data-testid="button-login"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserLoginFormSimple;
