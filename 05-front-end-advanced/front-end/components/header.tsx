import Link from "next/link";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<String>(null);

    useEffect(() => {
        setLoggedInUser(sessionStorage.getItem("loggedInUser"));
    }, []);

    const handleClick = () => {
        sessionStorage.removeItem("loggedInUser");
        setLoggedInUser(null);
    };

    return (
        <header className="p-3 mb-3 border-bottom bg-gradient-to-br from-gray-900 to-gray-600 flex flex-col items-center">
            <a className="flex mb-2 md:mb-5 text-white-50 text-3xl text-gray-300">
                Courses App
            </a>
            <nav className="items-center flex md:flex-row flex-col">
                <Link
                    href="/"
                    className="px-4 text-xl text-white  hover:bg-gray-600 rounded-lg">
                    Home
                </Link>
                <Link
                    href="/lecturers"
                    className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
                    Lecturers
                </Link>
                <Link
                    href="/schedule/overview"
                    className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
                    Schedules
                </Link>
                {!loggedInUser && (
                    <Link
                        href="/login"
                        className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
                        Login
                    </Link>
                )}
                {loggedInUser && (
                    <a
                        href="/login"
                        onClick={handleClick}
                        className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg">
                        Logout
                    </a>
                )}
                {loggedInUser && (
                    <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
                        Welcome, {loggedInUser}!
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
