
const getAllLecturers = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/lecturers", {
        method: "GET",
        headers: {
            "Content-Type": "text/plain",
        },
    });
};

const getLecturerById = (lecturerId: string) => {
    console.log("API call")
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/lecturers/${lecturerId}`, {
        method: "GET",
    });
};

const LecturerService = {
    getAllLecturers,
    getLecturerById,
};

export default LecturerService;
