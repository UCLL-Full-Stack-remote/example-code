import React from "react";
import { Lecturer } from "@types";

type Props = {
    lecturers: Array<Lecturer>;
    selectLecturer: (lecturer: Lecturer) => void;
};

const LecturerOverviewTable: React.FC<Props> = ({lecturers,selectLecturer,}: Props) => {
    return (
        <>
            {lecturers && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Expertise</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lecturers.map((lecturer, index) => (
                            <tr
                                key={index}
                                onClick={() => selectLecturer(lecturer)}
                                role="button"
                            >
                                <td>{lecturer.name}</td>
                                <td>{lecturer.expertise}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default LecturerOverviewTable;
