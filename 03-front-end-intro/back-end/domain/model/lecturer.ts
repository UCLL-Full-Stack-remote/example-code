import { Course } from "./course";

export class Lecturer {
    readonly id?: number;
    readonly name: string;
    readonly expertise: string;
    readonly courses: Array<Course>

    constructor(lecturer: { id: number; name: string; expertise: string, courses: Array<Course> }) {
        this.id = lecturer.id;
        this.name = lecturer.name;
        this.expertise = lecturer.expertise;
        this.courses = lecturer.courses
    }

    equals({ name, expertise }): boolean {
        return this.expertise === expertise;
    }
}
