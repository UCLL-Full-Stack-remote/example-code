import { Schedule } from '../model/schedule';

const schedules: Schedule[] = [];

const createSchedule = (schedule: Schedule): Schedule => {
    schedules.push(schedule);
    return schedule;
};

const getScheduleByCourseAndLecturer = ({
    courseId,
    lecturerId,
}: {
    courseId: number;
    lecturerId: number;
}): Schedule | undefined => {
    return schedules.find(
        (schedule) =>
            schedule.getCourse().getId() === courseId &&
            schedule.getLecturer().getId() === lecturerId
    );
};

const getAllSchedules = (): Schedule[] => schedules;

export default {
    createSchedule,
    getAllSchedules,
    getScheduleByCourseAndLecturer,
};
