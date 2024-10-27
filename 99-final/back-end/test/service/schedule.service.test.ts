import { set } from 'date-fns';
import { Course } from '../../model/course';
import { Lecturer } from '../../model/lecturer';
import { Schedule } from '../../model/schedule';
import { User } from '../../model/user';
import courseDb from '../../repository/course.db';
import lecturerDb from '../../repository/lecturer.db';
import scheduleDb from '../../repository/schedule.db';
import scheduleService from '../../service/schedule.service';
import { CourseInput, LecturerInput, UserInput } from '../../types';

const start = set(new Date(), { hours: 8, minutes: 30 });
const end = set(new Date(), { hours: 10, minutes: 30 });

const courseInput: CourseInput = {
    id: 1,
    name: 'Full-stack development',
    description: 'Learn how to develop a full-stack app',
    phase: 2,
    credits: 6,
};

const course = new Course({
    ...courseInput,
});

const userInput: UserInput = {
    id: 1,
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@ucll.be',
    password: 'johnd123',
    role: 'lecturer',
};

const user = new User({
    ...userInput,
});

const lecturerInput: LecturerInput = {
    id: 1,
    user: userInput,
    courses: [courseInput],
    expertise: 'Software development',
};

const lecturer = new Lecturer({
    id: 1,
    user,
    courses: [course],
    expertise: 'Software development',
});

let createScheduleMock: jest.Mock;

let mockScheduleDbGetScheduleByCourseAndLecturer: jest.Mock;
let mockCourseDbGetCourseById: jest.Mock;
let mockLecturerDbGetLecturerById: jest.Mock;

beforeEach(() => {
    mockScheduleDbGetScheduleByCourseAndLecturer = jest.fn();
    mockCourseDbGetCourseById = jest.fn();
    mockLecturerDbGetLecturerById = jest.fn();

    createScheduleMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid schedule, when schedule is created, then schedule is created with those values', async () => {
    // given
    courseDb.getCourseById = mockCourseDbGetCourseById.mockResolvedValue(course);
    lecturerDb.getLecturerById = mockLecturerDbGetLecturerById.mockResolvedValue(lecturer);
    scheduleDb.getScheduleByCourseAndLecturer =
        mockScheduleDbGetScheduleByCourseAndLecturer.mockResolvedValue(null);

    scheduleDb.createSchedule = createScheduleMock;

    // when
    await scheduleService.createSchedule({
        start,
        end,
        course: courseInput,
        lecturer: lecturerInput,
        students: [],
    });

    // then
    expect(createScheduleMock).toHaveBeenCalledTimes(1);
    expect(createScheduleMock).toHaveBeenCalledWith(
        new Schedule({ start, end, course, lecturer, students: [] })
    );
});

test('given a schedule with an existing course and lecturer, when schedule is created, then an error is thrown', async () => {
    // given
    courseDb.getCourseById = mockCourseDbGetCourseById.mockResolvedValue(course);
    lecturerDb.getLecturerById = mockLecturerDbGetLecturerById.mockResolvedValue(lecturer);
    scheduleDb.getScheduleByCourseAndLecturer =
        mockScheduleDbGetScheduleByCourseAndLecturer.mockResolvedValue(
            new Schedule({ start, end, course, lecturer, students: [] })
        );

    // when
    const createSchedule = async () =>
        await scheduleService.createSchedule({
            start,
            end,
            course: courseInput,
            lecturer: lecturerInput,
            students: [],
        });

    // then
    expect(createSchedule).rejects.toThrow('This course is already scheduled for this lecturer.');
});
