import { set } from 'date-fns';
import { Course } from '../../../domain/model/course';
import { Lecturer } from '../../../domain/model/lecturer';
import { Schedule } from '../../../domain/model/schedule';
import { Student } from '../../../domain/model/student';
import { User } from '../../../domain/model/user';

const start = set(new Date(), { hours: 8, minutes: 30 });
const end = set(new Date(), { hours: 10, minutes: 30 });
const course = new Course({
    name: 'Full-stack development',
    description: 'Learn how to develop a full-stack app',
    phase: 2,
    credits: 6,
});
const lecturerUser = new User({
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@ucll.be',
    password: 'johnd123',
    role: { id: 1, name: 'lecturer' },
});
const lecturer = new Lecturer({
    id: 1,
    user: lecturerUser,
    courses: [course],
    expertise: 'Software development',
});
const studentUser = new User({
    username: 'janjanssen',
    firstName: 'Jan',
    lastName: 'Janssen',
    email: 'jan.janssen@ucll.be',
    password: 'janj123',
    role: { id: 2, name: 'student' },
});
const student = new Student({ user: studentUser, studentnumber: 'r01234567' });

test('given: valid values for schedule, when: schedule is created, then: schedule is created with those values', () => {
    // given

    // when
    const schedule = new Schedule({ start, end, course, lecturer, students: [student] });

    // then
    expect(schedule.start).toEqual(start);
    expect(schedule.end).toEqual(end);
    expect(schedule.course).toEqual(course);
    expect(schedule.lecturer).toEqual(lecturer);
    expect(schedule.students).toContain(student);
});

test('given: an existing schedule, when: adding a student to schedule, then: student is registered for schedule', () => {
    // given
    const studentUser2 = new User({
        username: 'fransfranssen',
        firstName: 'Frans',
        lastName: 'Franssen',
        email: 'frans.franssen@ucll.be',
        password: 'fransf123',
        role: { id: 2, name: 'student' },
    });
    const student2 = new Student({ user: studentUser2, studentnumber: 'r045678910' });
    const schedule = new Schedule({ start, end, course, lecturer, students: [student] });

    // when
    schedule.addStudentToSchedule(student2);

    //then
    expect(schedule.students).toContain(student);
    expect(schedule.students).toContain(student2);
});

test('given: end date is before start date, when: schedule is created, then: an error is thrown', () => {
    // given
    const invalidEndDate = set(new Date(), { hours: 7, minutes: 30 });

    // when
    const schedule = () =>
        new Schedule({ start, end: invalidEndDate, course, lecturer, students: [student] });

    // then
    expect(schedule).toThrowError('Start date cannot be after end date');
});

test('given: an existing schedule, when: adding a student to schedule that is already registered, then: that student is registered only once', () => {
    // given
    const schedule = new Schedule({ start, end, course, lecturer, students: [student] });

    //when
    schedule.addStudentToSchedule(student);

    //then
    expect(schedule.students).toContain(student);
    expect(schedule.students).toHaveLength(1);
});
