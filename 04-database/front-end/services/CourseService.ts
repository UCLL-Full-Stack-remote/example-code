const getCourseById = (courseId: string) => {
    const token = JSON.parse(sessionStorage.getItem("loggedInUser"))?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/courses/${courseId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

const CourseService = {
    getCourseById,
};

export default CourseService;
