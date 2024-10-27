import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import ScheduleForm from "@components/schedule/ScheduleForm";
import CourseService from "@services/CourseService";
import LecturerService from "@services/LecturerService";
import Head from "next/head";
import Header from "@components/header";

const CreateSchedule = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");

    const router = useRouter();
    const { lecturerId, courseId } = router.query;

    const fetcher = async (key: string) => {
        const [lecturerResponse, courseResponse] = await Promise.all([
            LecturerService.getLecturerById(lecturerId as string),
            CourseService.getCourseById(courseId as string),
        ]);

        if (!lecturerResponse.ok || !courseResponse.ok) {
            if (lecturerResponse.status === 401) {
                setErrorMessage(
                    "You are not authorized to view this page. Please login first."
                );
            } else {
                setErrorMessage(lecturerResponse.statusText);
            }
        } else {
            const [lecturer, course] = await Promise.all([
                lecturerResponse.json(),
                courseResponse.json(),
            ]);
            return { lecturer, course };
        }
    };

    /**
     * We can't fetch data in getServerSideProps() because we need the loggedInUser from session storage.
     * Since getServerSideProps() runs on the server trying to fetch data while pre-rendering,
     * it doesn't have access to the session storage which is a client-side object.
     * useSWR() is a React hook that fetches data on the client-side as an alternative to useEffect() that
     * has a built in caching mechanism.
     */
    const { data, isLoading, error } = useSWR("lecturerCourse", fetcher);

    return (
        <>
            <Head>
                <title>New schedule</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Create new schedule</h1>
                <section>
                    {errorMessage && (
                        <p className="text-danger">{errorMessage}</p>
                    )}
                    {error && <p className="text-danger">{error}</p>}
                    {isLoading && <p>Loading...</p>}
                    {data && (
                        <ScheduleForm
                            lecturer={data.lecturer}
                            course={data.course}
                        />
                    )}
                </section>
            </main>
        </>
    );
};

export default CreateSchedule;
