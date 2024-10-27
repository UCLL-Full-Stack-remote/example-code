import { User } from "@types";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User>(null);

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
    };

    return (
        <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">
            <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
                {" "}
                Courses App
            </a>
            <nav className="nav justify-content-center">
                <Link href="/" className="nav-link px-4 fs-5 text-white">
                    Home
                </Link>
                <Link
                    href="/lecturers"
                    className="nav-link px-4 fs-5 text-white"
                >
                    Lecturers
                </Link>
                <Link
                    href="/schedule/overview"
                    className="nav-link px-4 fs-5 text-white"
                >
                    Schedules
                </Link>
                {!loggedInUser && (
                    <Link
                        href="/login"
                        className="nav-link px-4 fs-5 text-white"
                    >
                        Login
                    </Link>
                )}
                {loggedInUser && (
                    <a
                        href="/login"
                        onClick={handleClick}
                        className="nav-link px-4 fs-5 text-white"
                    >
                        Logout
                    </a>
                )}
                {loggedInUser && (
                    <div className="text-white ms-5 mt-2 pt-1">
                        Welcome, {loggedInUser.fullname}!
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
