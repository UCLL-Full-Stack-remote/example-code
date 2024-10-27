export type Course = {
    id: number;
    name: string;
    description: string;
    phase: number;
    credits: number;
};

export type Lecturer = {
    id: number;
    name: string;
    expertise: string;
    courses: Array<Course>
};