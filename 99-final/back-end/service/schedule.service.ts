import { UnauthorizedError } from 'express-jwt';
import courseDb from '../repository/course.db';
import lecturerDb from '../repository/lecturer.db';
import scheduleDb from '../repository/schedule.db';
import studentDb from '../repository/student.db';

import { Role, ScheduleInput, StudentInput } from '../types';
import { Schedule } from '../model/schedule';

const getSchedule = async ({
    username,
    role,
}: {
    username: string;
    role: Role;
}): Promise<Schedule[]> => {
    if (role === 'admin') {
        return scheduleDb.getAllSchedules();
    } else if (role === 'lecturer') {
        return scheduleDb.getScheduleForLecturer({ username });
    } else {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this resource.',
        });
    }
};

const createSchedule = async ({
    start,
    end,
    course: courseInput,
    lecturer: lecturerInput,
}: ScheduleInput): Promise<Schedule> => {
    if (!courseInput.id) throw new Error('Course id is required');
    if (!lecturerInput.id) throw new Error('Lecturer id is required');

    const course = await courseDb.getCourseById({ id: courseInput.id });
    const lecturer = await lecturerDb.getLecturerById({ id: lecturerInput.id });

    if (!course) throw new Error('Course not found');
    if (!lecturer) throw new Error('Lecturer not found');

    const existingSchedule = await scheduleDb.getScheduleByCourseAndLecturer({
        courseId: courseInput.id,
        lecturerId: lecturerInput.id,
    });

    if (existingSchedule) throw new Error('This course is already scheduled for this lecturer.');

    const schedule = new Schedule({ start, end, course, lecturer, students: [] });
    return await scheduleDb.createSchedule(schedule);
};

const addStudentsToSchedule = async ({
    schedule: scheduleInput,
    students: studentsInput,
}: {
    schedule: ScheduleInput;
    students: StudentInput[];
}): Promise<Schedule | null> => {
    if (!scheduleInput.id) throw new Error('Schedule id is required');
    if (!studentsInput.length) throw new Error('At least one student is required');

    const schedule = await scheduleDb.getScheduleById({ id: scheduleInput.id });
    if (!schedule) throw new Error('Schedule not found');

    const students = await Promise.all(
        studentsInput.map(async (studentInput) => {
            if (!studentInput.id) throw new Error('Student id is required');
            const student = await studentDb.getStudentById({ id: studentInput.id });
            if (!student) throw new Error(`Student with id ${studentInput.id} not found`);
            return student;
        })
    );

    students.forEach((student) => {
        schedule.addStudentToSchedule(student);
    });

    return await scheduleDb.updateStudentsOfSchedule({ schedule });
};

export default { getSchedule, addStudentsToSchedule, createSchedule };
