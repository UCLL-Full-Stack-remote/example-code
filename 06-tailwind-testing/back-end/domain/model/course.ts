import { Course as CoursePrisma } from '@prisma/client';

export class Course {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly phase: number;
    readonly credits: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(course: {
        id?: number;
        name: string;
        description: string;
        phase: number;
        credits: number;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = course.id;
        this.name = course.name;
        this.description = course.description;
        this.phase = course.phase;
        this.credits = course.credits;
        this.createdAt = course.createdAt;
        this.updatedAt = course.updatedAt;
    }

    equals({ id, name, description, phase, credits, createdAt, updatedAt }): boolean {
        return (
            this.id === id &&
            this.name === name &&
            this.description === description &&
            this.phase === phase &&
            this.credits === credits &&
            this.createdAt === createdAt &&
            this.updatedAt === updatedAt
        );
    }

    static from({ id, name, description, phase, credits, createdAt, updatedAt }: CoursePrisma) {
        return new Course({
            id,
            name,
            description,
            phase,
            credits,
            createdAt,
            updatedAt,
        });
    }
}
