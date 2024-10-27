import React from "react";
import { Lecturer } from "@types";

type Props = {
    lecturer: Lecturer
};

const LecturerInfo: React.FC<Props> = ({lecturer}: Props) => {
    return (
        <>
            {lecturer && (
                <div>
                    <p>{lecturer.id}</p>
                    <p>{lecturer.name}</p>
                    <p>{lecturer.expertise}</p>
                </div>
            )}
        </>
    );
};

export default LecturerInfo
