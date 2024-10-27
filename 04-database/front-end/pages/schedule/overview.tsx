import Head from "next/head";
import { useEffect, useState } from "react";
import Header from "@components/header";
import ScheduleOverview from "@components/schedule/ScheduleOverview";
import ScheduleService from "@services/ScheduleService";
import StudentService from "@services/StudentService";
import { Schedule, Student, User } from "@types";
import useInterval from "use-interval";

const Schedules: React.FC = () => {
    const [schedules, setSchedules] = useState<Array<Schedule>>();
    const [students, setStudents] = useState<Array<Student>>();
    const [error, setError] = useState<string>();
    const [loggedInUser, setLoggedInUser] = useState<User>(null);

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser")));
    }, []);

    const getSchedulesAndStudents = async () => {
        setError("");
        const responses = await Promise.all([
            ScheduleService.getSchedule(),
            StudentService.getAllStudents(),
        ]);

        const [schedulesResponse, studentsResponse] = responses;

        if (!schedulesResponse.ok || !studentsResponse.ok) {
            if (schedulesResponse.status === 401) {
                setError(
                    "You are not authorized to view this page. Please login first."
                );
            } else {
                setError(schedulesResponse.statusText);
            }
        } else {
            const schedules = await schedulesResponse.json();
            const students = await studentsResponse.json();
            setSchedules(schedules);
            setStudents(students);
        }
    };

    useEffect(() => {
        getSchedulesAndStudents();
    }, []);

    useInterval(() => {
        if (!error) getSchedulesAndStudents();
    }, 1000);

    return (
        <>
            <Head>
                <title>Schedules</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>
                    Schedule{" "}
                    {loggedInUser &&
                        `for ${
                            loggedInUser.role === "admin"
                                ? "all users (admin)"
                                : loggedInUser.fullname
                        }`}
                </h1>
                <section>
                    {error && <div className="text-danger">{error}</div>}
                    {schedules && (
                        <ScheduleOverview
                            schedules={schedules}
                            students={students}
                        />
                    )}
                </section>
            </main>
        </>
    );
};

export default Schedules;
