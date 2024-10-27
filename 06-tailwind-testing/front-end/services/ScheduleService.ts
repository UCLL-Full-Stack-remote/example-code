import { Schedule, Student } from "@types";

const getSchedule = () => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/schedules", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const enrollStudent = (schedule: Schedule, student: Student) => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/schedules/enroll", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            schedule,
            students: [student],
        }),
    });
};

const createSchedule = (schedule: Schedule) => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/schedules", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(schedule),
    });
};

const ScheduleService = {
    getSchedule,
    enrollStudent,
    createSchedule,
};

export default ScheduleService;
