import {
    Course as CoursePrisma,
    Lecturer as LecturerPrisma,
    User as UserPrisma,
} from '@prisma/client';
import { Course } from './course';
import { User } from './user';

export class Lecturer {
    readonly id?: number;
    readonly user: User;
    readonly expertise: string;
    readonly courses: Course[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(lecturer: {
        courses: Course[];
        user: User;
        expertise: string;
        id?: number;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.validate(lecturer);

        this.id = lecturer.id;
        this.user = lecturer.user;
        this.courses = lecturer.courses;
        this.expertise = lecturer.expertise;
        this.createdAt = lecturer.createdAt;
        this.updatedAt = lecturer.updatedAt;
    }

    validate(lecturer: { courses: Course[]; user: User; expertise: string }) {
        if (!lecturer.user) {
            throw new Error('User is required');
        }
        if (!lecturer.expertise) {
            throw new Error('Expertise is required');
        }
        if (!lecturer.courses) {
            throw new Error('Courses are required');
        }
    }

    equals({ id, user, courses, expertise, createdAt, updatedAt }): boolean {
        return (
            this.id === id &&
            this.user.equals(user) &&
            this.courses.every((course, index) => course.equals(courses[index])) &&
            this.expertise === expertise &&
            this.createdAt === createdAt &&
            this.updatedAt === updatedAt
        );
    }

    static from({
        id,
        user,
        courses,
        expertise,
        createdAt,
        updatedAt,
    }: LecturerPrisma & { user: UserPrisma; courses: CoursePrisma[] }) {
        return new Lecturer({
            id,
            user: User.from(user),
            courses: courses.map((course) => Course.from(course)),
            expertise,
            createdAt,
            updatedAt,
        });
    }
}
