import classNames from "classnames";
import dayjs from "dayjs";
import React, { useState } from "react";
//refactoring needed for tests
//import ScheduleService from "@services/ScheduleService";
import ScheduleService from "../../services/ScheduleService";
import { Schedule, Student } from "@types";

type Props = {
    schedules: Array<Schedule>;
    students: Array<Student>;
};

const ScheduleOverview: React.FC<Props> = ({ schedules, students }: Props) => {
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule>(null);

    const selectSchedule = (schedule: Schedule) => {
        setSelectedSchedule(schedule);
    };

    const handleEnroll = async (student: Student) => {
        await ScheduleService.enrollStudent(selectedSchedule, student)
    };

    return (
        <>
            {schedules && (
                <table className="mt-6">
                    <thead>
                        <tr>
                            <th scope="col">Course</th>
                            <th scope="col">Start</th>
                            <th scope="col">End</th>
                            <th scope="col">Lecturer</th>
                            <th scope="col">Enrolled students</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule, index) => (
                            <tr
                                key={index}
                                data-testid={index}
                                onClick={() => selectSchedule(schedule)}
                                className={classNames({"table-active": selectedSchedule?.id === schedule.id,})}
                                role="button">
                                <td>{schedule.course.name}</td>
                                <td>{dayjs(schedule.start).format("DD-MM-YYYY HH:mm")}</td>
                                <td>{dayjs(schedule.end).format("DD-MM-YYYY HH:mm")}</td>
                                <td id={schedule.lecturer.user.firstName}>{schedule.lecturer.user.firstName + " " + schedule.lecturer.user.lastName}</td>
                                <td data-testid={index+schedule.lecturer.user.firstName}>{schedule.students.length} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {selectedSchedule && (
                <section className="mt-5">
                    <h2 className="text-center">Students</h2>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Firstname</th>
                                <th scope="col">Lastname</th>
                                <th scope="col">Studentnumber</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.user.firstName}</td>
                                    <td>{student.user.lastName}</td>
                                    <td>{student.studentnumber}</td>
                                    <td>{!selectedSchedule.students.find((s) => s.studentnumber === student.studentnumber) && 
                                        (
                                            <button
                                                data-testid={student.studentnumber}
                                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                onClick={() => handleEnroll(student)}>
                                                Enroll
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            )}
        </>
    );
};

export default ScheduleOverview;
