import { Schedule } from '../model/schedule';
import courseDb from '../repository/course.db';
import lecturerDb from '../repository/lecturer.db';
import scheduleDb from '../repository/schedule.db';
import { ScheduleInput } from '../types';

const createSchedule = ({
    start,
    end,
    course: courseInput,
    lecturer: lecturerInput,
}: ScheduleInput): Schedule => {
    if (!courseInput.id) throw new Error('Course id is required');
    if (!lecturerInput.id) throw new Error('Lecturer id is required');

    if (!start || !end) {
        throw new Error('Start and end date are required');
    }

    const course = courseDb.getCourseById({ id: courseInput.id });
    const lecturer = lecturerDb.getLecturerById({ id: lecturerInput.id });

    if (!course) throw new Error('Course not found');
    if (!lecturer) throw new Error('Lecturer not found');

    const existingSchedule = scheduleDb.getScheduleByCourseAndLecturer({
        courseId: courseInput.id,
        lecturerId: lecturerInput.id,
    });

    if (existingSchedule) throw new Error('This course is already scheduled for this lecturer.');

    const schedule = new Schedule({ start, end, course, lecturer, students: [] });
    return scheduleDb.createSchedule(schedule);
};

export default { createSchedule };
