import { User as UserPrisma } from '@prisma/client';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;

    constructor(user: {
        id?: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }) {
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
    }

    equals({ id, username, firstName, lastName, email, password }): boolean {
        return (
            this.id === id &&
            this.username === username &&
            this.firstName === firstName &&
            this.lastName === lastName &&
            this.email === email &&
            this.password === password 
        );
    }

    static from({
        id,
        username,
        firstName,
        lastName,
        email,
        password,
    }: UserPrisma) {
        return new User({
            id,
            username,
            firstName,
            lastName,
            email,
            password,
        });
    }
}
