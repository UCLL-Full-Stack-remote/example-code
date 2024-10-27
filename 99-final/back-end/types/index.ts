type Role = 'admin' | 'student' | 'lecturer' | 'guest';

type UserInput = {
    id?: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
};

type LecturerInput = {
    id?: number;
    user: UserInput;
    expertise: string;
    courses: CourseInput[];
};

type StudentInput = {
    id?: number;
    user: UserInput;
    studentnumber: string;
};

type CourseInput = {
    id?: number;
    name: string;
    description: string;
    phase: number;
    credits: number;
};

type ScheduleInput = {
    id?: number;
    start: Date;
    end: Date;
    course: CourseInput;
    lecturer: LecturerInput;
    students: StudentInput[];
};

type EnrollmentInput = {
    schedule: ScheduleInput;
    students: StudentInput[];
};

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};

export {
    Role,
    LecturerInput,
    UserInput,
    StudentInput,
    CourseInput,
    ScheduleInput,
    EnrollmentInput,
    AuthenticationResponse,
};
