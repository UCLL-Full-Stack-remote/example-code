import { set } from 'date-fns';
import courseDb from '../../domain/data-access/course.db';
import lecturerDb from '../../domain/data-access/lecturer.db';
import scheduleDb from '../../domain/data-access/schedule.db';
import { Course } from '../../domain/model/course';
import { Lecturer } from '../../domain/model/lecturer';
import { Schedule } from '../../domain/model/schedule';
import { User } from '../../domain/model/user';
import scheduleService from '../../service/schedule.service';

const start = set(new Date(), { hours: 8, minutes: 30 });
const end = set(new Date(), { hours: 10, minutes: 30 });
const course = new Course({
    name: 'Full-stack development',
    description: 'Learn how to develop a full-stack app',
    phase: 2,
    credits: 6,
});
const user = new User({
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@ucll.be',
    password: 'johnd123',
    role: { id: 1, name: 'lecturer' },
});
const lecturer = new Lecturer({
    id: 1,
    user,
    courses: [course],
    expertise: 'Software development',
});

let createScheduleMock: jest.Mock;

let mockScheduleDbGetScheduleByCourseAndLecturer: jest.SpyInstance;
let mockCourseDbGetCourseById: jest.SpyInstance;
let mockLecturerDbGetLecturerById: jest.SpyInstance;

beforeEach(() => {
    mockScheduleDbGetScheduleByCourseAndLecturer = jest.spyOn(
        scheduleDb,
        'getScheduleByCourseAndLecturer'
    );
    mockCourseDbGetCourseById = jest.spyOn(courseDb, 'getCourseById');
    mockLecturerDbGetLecturerById = jest.spyOn(lecturerDb, 'getLecturerById');

    createScheduleMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid schedule, when schedule is created, then schedule is created with those values', async () => {
    // given
    scheduleDb.createSchedule = createScheduleMock;

    mockCourseDbGetCourseById.mockResolvedValue(course);
    mockLecturerDbGetLecturerById.mockResolvedValue(lecturer);
    mockScheduleDbGetScheduleByCourseAndLecturer.mockResolvedValue(null);

    // when
    await scheduleService.createSchedule({ start, end, course, lecturer });

    // then
    expect(createScheduleMock).toHaveBeenCalledTimes(1);
    expect(createScheduleMock).toHaveBeenCalledWith(
        new Schedule({ start, end, course, lecturer, students: [] })
    );
});

test('given a schedule with an existing course and lecturer, when schedule is created, then an error is thrown', async () => {
    // given
    mockCourseDbGetCourseById.mockResolvedValue(course);
    mockLecturerDbGetLecturerById.mockResolvedValue(lecturer);
    mockScheduleDbGetScheduleByCourseAndLecturer.mockResolvedValue(
        new Schedule({ start, end, course, lecturer, students: [] })
    );

    // when
    const createSchedule = async () =>
        await scheduleService.createSchedule({ start, end, course, lecturer });

    // then
    expect(createSchedule).rejects.toThrowError(
        'This course is already scheduled for this lecturer.'
    );
});

test('given a valid schedule, when schedule is created, then schedule is created with those values', async () => {
    // given
    scheduleDb.createSchedule = createScheduleMock;

    mockCourseDbGetCourseById.mockResolvedValue(course);
    mockLecturerDbGetLecturerById.mockResolvedValue(lecturer);
    mockScheduleDbGetScheduleByCourseAndLecturer.mockResolvedValue(null);

    // when
    await scheduleService.createSchedule({ start, end, course, lecturer });

    // then
    expect(createScheduleMock).toHaveBeenCalledTimes(1);
    expect(createScheduleMock).toHaveBeenCalledWith(
        new Schedule({ start, end, course, lecturer, students: [] })
    );
});
