import { Schedule, Student } from "@types";

const getSchedule = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/schedules", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const enrollStudent = (schedule: Schedule, student: Student) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/schedules/enroll", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            schedule,
            students: [student],
        }),
    });
};

const createSchedule = (schedule: Schedule) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/schedules", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
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
