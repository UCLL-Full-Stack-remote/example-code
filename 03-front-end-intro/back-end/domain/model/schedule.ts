import { Course } from './course';
import { Lecturer } from './lecturer';
import { Student } from './student';

export class Schedule {
    readonly id?: number;
    readonly start: Date;
    readonly end: Date;
    readonly course: Course;
    readonly lecturer: Lecturer;
    readonly students: Student[];

    constructor(schedule: {
        start: Date;
        end: Date;
        course: Course;
        lecturer: Lecturer;
        students: Student[];
        createdAt?: Date;
        updatedAt?: Date;
        id?: number;
    }) {
        this.validate(schedule);

        this.start = schedule.start;
        this.end = schedule.end;
        this.course = schedule.course;
        this.lecturer = schedule.lecturer;
        this.students = schedule.students || [];
        this.id = schedule.id;
    }

    validate(schedule: { start: Date; end: Date; course: Course; lecturer: Lecturer }) {
        if (!schedule.start || !schedule.end) {
            throw new Error('Start and end date are required');
        }
        if (schedule.start > schedule.end) {
            throw new Error('Start date cannot be after end date');
        }
        if (!schedule.course) {
            throw new Error('Course is required');
        }
        if (!schedule.lecturer) {
            throw new Error('Lecturer is required');
        }
    }

    addStudentToSchedule(student: Student) {
        if (!student) throw new Error('Student is required');
        if (this.students.includes(student))
            throw new Error('Student is already enrolled in this schedule');

        this.students.push(student);
    }

    equals({ id, start, end, course, lecturer, students, createdAt, updatedAt }): boolean {
        return (
            this.id === id &&
            this.start === start &&
            this.end === end &&
            this.course.equals(course) &&
            this.lecturer.equals(lecturer) &&
            this.students.every((student, index) => student.equals(students[index]))
        );
    }
}
