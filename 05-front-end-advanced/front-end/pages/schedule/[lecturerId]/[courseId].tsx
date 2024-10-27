import { useRouter } from "next/router";
import useSWR from "swr";
import ScheduleForm from "@components/schedule/ScheduleForm";
import CourseService from "@services/CourseService";
import LecturerService from "@services/LecturerService";
import Head from "next/head";
import Header from "@components/header";

const CreateSchedule = () => {
    const router = useRouter();
    const { lecturerId, courseId } = router.query;

    const fetcher = async (key: string) => {
        const [lecturerResponse, courseResponse] = await Promise.all([
            LecturerService.getLecturerById(lecturerId as string),
            CourseService.getCourseById(courseId as string),
        ]);

        if (lecturerResponse.ok && courseResponse.ok) {
            const [lecturer, course] = await Promise.all([
                lecturerResponse.json(),
                courseResponse.json(),
            ]);
            return { lecturer, course };
        }
    };

    const { data, isLoading, error } = useSWR("lecturerCourse", fetcher);

    return (
        <>
            <Head>
                <title>New schedule</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1>Create new schedule</h1>
                <section className="w-50">
                    {error && <p className="text-danger">{error}</p>}
                    {isLoading && <p className="text-green-800">Loading...</p>}
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
