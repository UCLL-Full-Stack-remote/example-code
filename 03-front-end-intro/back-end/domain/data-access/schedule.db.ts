import { Schedule } from '../model/schedule';

const schedules = [];

const createSchedule = ({ start, end, course, lecturer }: Schedule): Schedule => {
    const schedule = new Schedule({ start, end, course, lecturer, students: [] });
    schedules.push({ start, end, course, lecturer });
    return schedule;
};

const getScheduleByCourseAndLecturer = ({
    courseId,
    lecturerId,
}: {
    courseId: number;
    lecturerId: number;
}): Schedule | null => {
    return schedules.find(
        (schedule) => schedule.course.id === courseId && schedule.lecturer.id === lecturerId
    );
};

const getAllSchedules = (): Schedule[] => schedules;

export default {
    createSchedule,
    getAllSchedules,
    getScheduleByCourseAndLecturer,
};
