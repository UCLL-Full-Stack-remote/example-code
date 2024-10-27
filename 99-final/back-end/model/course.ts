import { Course as CoursePrisma } from '@prisma/client';

export class Course {
    private id?: number;
    private name: string;
    private description: string;
    private phase: number;
    private credits: number;

    constructor(course: {
        id?: number;
        name: string;
        description: string;
        phase: number;
        credits: number;
    }) {
        this.id = course.id;
        this.name = course.name;
        this.description = course.description;
        this.phase = course.phase;
        this.credits = course.credits;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getPhase(): number {
        return this.phase;
    }

    getCredits(): number {
        return this.credits;
    }

    equals(course: Course): boolean {
        return (
            this.name === course.getName() &&
            this.description === course.getDescription() &&
            this.phase === course.getPhase() &&
            this.credits === course.getCredits()
        );
    }

    static from({ id, name, description, phase, credits }: CoursePrisma) {
        return new Course({
            id,
            name,
            description,
            phase,
            credits,
        });
    }
}
