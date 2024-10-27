import {
    Course as CoursePrisma,
    Lecturer as LecturerPrisma,
    User as UserPrisma,
} from '@prisma/client';
import { Course } from './course';
import { User } from './user';

export class Lecturer {
    private id?: number;
    private user: User;
    private expertise: string;
    private courses: Course[];

    constructor(lecturer: { courses: Course[]; user: User; expertise: string; id?: number }) {
        this.validate(lecturer);

        this.id = lecturer.id;
        this.user = lecturer.user;
        this.courses = lecturer.courses;
        this.expertise = lecturer.expertise;
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

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getExpertise(): string {
        return this.expertise;
    }

    getCourses(): Course[] {
        return this.courses;
    }

    equals(lecturer: Lecturer): boolean {
        return (
            this.id === lecturer.getId() &&
            this.user.equals(lecturer.getUser()) &&
            this.courses.every((course, index) => course.equals(lecturer.getCourses()[index])) &&
            this.expertise === lecturer.getExpertise()
        );
    }

    static from({
        id,
        user,
        courses,
        expertise,
    }: LecturerPrisma & { user: UserPrisma; courses: CoursePrisma[] }) {
        return new Lecturer({
            id,
            user: User.from(user),
            courses: courses.map((course) => Course.from(course)),
            expertise,
        });
    }
}
