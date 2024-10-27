export class Course {
    readonly id?: number;
    readonly name: string;
    readonly description: string;
    readonly phase: number;
    readonly credits: number;

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
    }

    equals({ id, name, description, phase, credits, createdAt, updatedAt }): boolean {
        return (
            this.id === id &&
            this.name === name &&
            this.description === description &&
            this.phase === phase &&
            this.credits === credits
        );
    }
}
