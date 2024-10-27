import { User } from './user';

export class Student {
    private id?: number;
    private user: User;
    private studentnumber: string;

    constructor(student: { id?: number; user: User; studentnumber: string }) {
        this.id = student.id;
        this.user = student.user;
        this.studentnumber = student.studentnumber;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getStudentnumber(): string {
        return this.studentnumber;
    }

    equals(student: Student): boolean {
        return (
            this.id === student.getId() &&
            this.user.equals(student.getUser()) &&
            this.studentnumber === student.getStudentnumber()
        );
    }
}
