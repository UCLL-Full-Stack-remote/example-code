const getAllStudents = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/students", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const StudentService = {
    getAllStudents,
};

export default StudentService;
