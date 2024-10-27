import { set } from 'date-fns';
import { Course } from '../../../domain/model/course';
import { Lecturer } from '../../../domain/model/lecturer';
import { Schedule } from '../../../domain/model/schedule';
import { Student } from '../../../domain/model/student';

const start = set(new Date(), { hours: 8, minutes: 30 });
const end = set(new Date(), { hours: 10, minutes: 30 });
const course = new Course({
    name: 'Full-stack development',
    description: 'Learn how to develop a full-stack app',
    phase: 2,
    credits: 6,
});
const lecturer = new Lecturer({ id: 1, name: 'Johan Pieck', expertise: 'Software development' });
const student = new Student({ name: 'Jan Janssen', studentnumber: 'r01234567' });

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

test('given: end date is before start date, when: schedule is created, then: an error is thrown', () => {
    // given
    const invalidEndDate = set(new Date(), { hours: 7, minutes: 30 });

    // when
    const schedule = () =>
        new Schedule({ start, end: invalidEndDate, course, lecturer, students: [student] });

    // then
    expect(schedule).toThrowError('Start date cannot be after end date');
});

test('given: an existing schedule, when: adding a student to schedule, then: student is registered for schedule', () => {
    // given
    const student2 = new Student({ name: 'Frans Franssen', studentnumber: 'r045678910' });
    const schedule = new Schedule({ start, end, course, lecturer, students: [student] });

    // when
    schedule.addStudentToSchedule(student2);

    //then
    expect(schedule.students).toContain(student);
    expect(schedule.students).toContain(student2);
});

test('given: an existing schedule, when: adding a student to schedule that is already registered, then: an error is thrown', () => {
    // given
    const schedule = new Schedule({ start, end, course, lecturer, students: [student] });

    //when
    const addStudent = () => schedule.addStudentToSchedule(student);

    //then
    expect(addStudent).toThrowError('Student is already enrolled in this schedule');
});
