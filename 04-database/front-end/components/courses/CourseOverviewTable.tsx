import { Lecturer, User } from "@types";
import { log } from "console";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
    lecturer: Lecturer;
};

const CourseOverviewTable: React.FC<Props> = ({ lecturer }: Props) => {
    const [loggedInUser, setLoggedInUser] = useState<User>(null);

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
        console.log(loggedInUser);
    }, []);

    return (
        <>
            {lecturer.courses && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Phase</th>
                            <th scope="col">Credits</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {lecturer.courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.name}</td>
                                <td>{course.description}</td>
                                <td>{course.phase}</td>
                                <td>{course.credits}</td>
                                <td>
                                    {loggedInUser?.role === "admin" && (
                                        <Link
                                            href={`/schedule/${lecturer.id}/${course.id}`}
                                        >
                                            <button className="btn btn-primary">
                                                Schedule
                                            </button>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default CourseOverviewTable;
