import { UnauthorizedError } from 'express-jwt';
import courseDb from '../domain/data-access/course.db';
import lecturerDb from '../domain/data-access/lecturer.db';
import scheduleDb from '../domain/data-access/schedule.db';
import studentDb from '../domain/data-access/student.db';
import { Schedule } from '../domain/model/schedule';
import { Role, ScheduleInput, StudentInput } from '../types';

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
    const course = await courseDb.getCourseById({ id: courseInput.id });
    const lecturer = await lecturerDb.getLecturerById({ id: lecturerInput.id });

    if (!course) throw new Error('Course not found');
    if (!lecturer) throw new Error('Lecturer not found');

    const existingSchedule = await scheduleDb.getScheduleByCourseAndLecturer({
        courseId: course.id,
        lecturerId: lecturer.id,
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
    if (!studentsInput.length) throw new Error('At least one student is required');

    const schedule = await scheduleDb.getScheduleById({ id: scheduleInput.id });
    if (!schedule) throw new Error('Schedule not found');

    const students = await Promise.all(
        studentsInput.map(async (studentInput) => {
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
