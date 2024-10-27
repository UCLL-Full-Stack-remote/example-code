import courseDb from '../domain/data-access/course.db';
import lecturerDb from '../domain/data-access/lecturer.db';
import scheduleDb from '../domain/data-access/schedule.db';
import { Course } from '../domain/model/course';
import { Schedule } from '../domain/model/schedule';
import { ScheduleInput } from '../types';

const createSchedule = ({
    start,
    end,
    course: courseInput,
    lecturer: lecturerInput,
}: ScheduleInput): Schedule => {
    let course: Course | null;
    if(courseInput?.id){
     course = courseDb.getCourseById({ id: courseInput.id });
    } else {
        throw new Error('bla');
    }
    const lecturer = lecturerDb.getLecturerById({ id: lecturerInput.id });

    if (!course) throw new Error('Course not found');
    if (!lecturer) throw new Error('Lecturer not found');

    const existingSchedule = scheduleDb.getScheduleByCourseAndLecturer({
        courseId: course.id,
        lecturerId: lecturer.id,
    });

    if (existingSchedule) throw new Error('This course is already scheduled for this lecturer.');

    const schedule = new Schedule({ start, end, course, lecturer, students: [] });
    return scheduleDb.createSchedule(schedule);
};

export default { createSchedule };
