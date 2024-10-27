import {
    Course as CoursePrisma,
    Lecturer as LecturerPrisma,
    Schedule as SchedulePrisma,
    Student as StudentPrisma,
    User as UserPrisma,
} from '@prisma/client';
import { Course } from './course';
import { Lecturer } from './lecturer';
import { Student } from './student';

export class Schedule {
    private id?: number;
    private start: Date;
    private end: Date;
    private course: Course;
    private lecturer: Lecturer;
    private students: Student[];

    constructor(schedule: {
        id?: number;
        start: Date;
        end: Date;
        course: Course;
        lecturer: Lecturer;
        students: Student[];
    }) {
        this.validate(schedule);

        this.start = schedule.start;
        this.end = schedule.end;
        this.course = schedule.course;
        this.lecturer = schedule.lecturer;
        this.students = schedule.students || [];
        this.id = schedule.id;
    }

    getId(): number | undefined {
        return this.id;
    }

    getStart(): Date {
        return this.start;
    }

    getEnd(): Date {
        return this.end;
    }

    getCourse(): Course {
        return this.course;
    }

    getLecturer(): Lecturer {
        return this.lecturer;
    }

    getStudents(): Student[] {
        return this.students;
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

    equals(schedule: Schedule): boolean {
        return (
            this.id === schedule.getId() &&
            this.start === schedule.getStart() &&
            this.end === schedule.getEnd() &&
            this.course.equals(schedule.getCourse()) &&
            this.lecturer.equals(schedule.getLecturer()) &&
            this.students.every((student, index) => student.equals(schedule.getStudents()[index]))
        );
    }

    static from({
        id,
        start,
        end,
        course,
        lecturer,
        students,
    }: SchedulePrisma & {
        course: CoursePrisma;
        lecturer: LecturerPrisma & {
            user: UserPrisma;
            courses: CoursePrisma[];
        };
        students: (StudentPrisma & { user: UserPrisma })[];
    }) {
        return new Schedule({
            id,
            start,
            end,
            course: Course.from(course),
            lecturer: Lecturer.from(lecturer),
            students: students.map((student) => Student.from(student)),
        });
    }
}
