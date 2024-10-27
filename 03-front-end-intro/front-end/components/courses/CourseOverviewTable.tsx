import { Lecturer } from "@types";
import React from "react";

type Props = {
    lecturer: Lecturer;
};

const CourseOverviewTable: React.FC<Props> = ({ lecturer }: Props) => {
    return (
        <>
            {lecturer && (
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
                            <td></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default CourseOverviewTable;
