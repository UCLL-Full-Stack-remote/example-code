type UserInput = {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
};

type LecturerInput = {
    id?: number;
    user?: UserInput;
    expertise?: string;
    courses?: CourseInput[];
};

type CourseInput = {
    id?: number;
    name?: string;
    description?: string;
    phase?: number;
    credits?: number;
};

type ScheduleInput = {
    id?: number;
    start?: Date;
    end?: Date;
    course?: CourseInput;
};

export {
    LecturerInput,
    UserInput,
    CourseInput,
    ScheduleInput,
};
