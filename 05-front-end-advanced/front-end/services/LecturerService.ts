import { User } from "@types";

const getAllLecturers = () => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;
console.log(process.env.NEXT_PUBLIC_API_URL)
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/lecturers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const getLecturerById = (lecturerId: string) => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/lecturers/${lecturerId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const LecturerService = {
    getAllLecturers,
    getLecturerById,
};

export default LecturerService;
