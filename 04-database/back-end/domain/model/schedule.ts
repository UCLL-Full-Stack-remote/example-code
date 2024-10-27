import {
    Course as CoursePrisma,
    Lecturer as LecturerPrisma,
    Schedule as SchedulePrisma,
} from '@prisma/client';
import { Course } from './course';

export class Schedule {
    readonly id?: number;
    readonly start: Date;
    readonly end: Date;
    readonly course: Course;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(schedule: {
        start: Date;
        end: Date;
        course: Course;
        createdAt?: Date;
        updatedAt?: Date;
        id?: number;
    }) {
        this.validate(schedule);

        this.start = schedule.start;
        this.end = schedule.end;
        this.course = schedule.course;
        this.createdAt = schedule.createdAt;
        this.updatedAt = schedule.updatedAt;
        this.id = schedule.id;
    }

    validate(schedule: { start: Date; end: Date; course: Course }) {
        if (!schedule.start || !schedule.end) {
            throw new Error('Start and end date are required');
        }
        if (schedule.start > schedule.end) {
            throw new Error('Start date cannot be after end date');
        }
        if (!schedule.course) {
            throw new Error('Course is required');
        }
    }

    equals({ id, start, end, course, createdAt, updatedAt }): boolean {
        return (
            this.id === id &&
            this.start === start &&
            this.end === end &&
            this.course.equals(course) &&
            this.createdAt === createdAt &&
            this.updatedAt === updatedAt
        );
    }

    static from({
        id,
        start,
        end,
        course,
        createdAt,
        updatedAt,
    }: SchedulePrisma & {
        course: CoursePrisma;
    }) {
        return new Schedule({
            id,
            start,
            end,
            course: Course.from(course), 
            createdAt,
            updatedAt,
        });
    }
}
