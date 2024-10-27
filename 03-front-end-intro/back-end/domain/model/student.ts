export class Student {
    readonly name: string;
    readonly studentnumber: string;

    constructor(student: { name: string; studentnumber: string }) {
        this.name = student.name;
        this.studentnumber = student.studentnumber;
    }

    equals({ name, studentnumber }): boolean {
        return this.name === name && this.studentnumber === studentnumber;
    }
}
