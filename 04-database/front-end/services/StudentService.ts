const getAllStudents = () => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/students", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const StudentService = {
    getAllStudents,
};

export default StudentService;
