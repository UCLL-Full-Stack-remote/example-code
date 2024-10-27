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

let createScheduleMock: jest.Mock

let mockScheduleDbGetScheduleByCourseAndLecturer: jest.Mock
let mockCourseDbGetCourseById: jest.Mock
let mockLecturerDbGetLecturerById: jest.Mock

beforeEach(() => {
    mockScheduleDbGetScheduleByCourseAndLecturer = jest.fn()
    mockCourseDbGetCourseById = jest.fn()
    mockLecturerDbGetLecturerById = jest.fn()

    createScheduleMock = jest.fn()
})

afterEach(() => {
    jest.clearAllMocks()
})

test('given a valid schedule, when schedule is created, then schedule is created with those values', async () => {
    // given
    courseDb.getCourseById = mockCourseDbGetCourseById.mockResolvedValue(course)
    lecturerDb.getLecturerById = mockLecturerDbGetLecturerById.mockResolvedValue(lecturer)
    scheduleDb.getScheduleByCourseAndLecturer = mockScheduleDbGetScheduleByCourseAndLecturer.mockResolvedValue(null)

    scheduleDb.createSchedule = createScheduleMock;

    // when
    await scheduleService.createSchedule({ start, end, course, lecturer, students: [] })

    // then
    expect(createScheduleMock).toHaveBeenCalledTimes(1)
    expect(createScheduleMock).toHaveBeenCalledWith(new Schedule({ start, end, course, lecturer, students: [] }))
})

test('given a schedule with an existing course and lecturer, when schedule is created, then an error is thrown', async () => {
    // given
    courseDb.getCourseById = mockCourseDbGetCourseById.mockResolvedValue(course)
    lecturerDb.getLecturerById = mockLecturerDbGetLecturerById.mockResolvedValue(lecturer)
    scheduleDb.getScheduleByCourseAndLecturer = mockScheduleDbGetScheduleByCourseAndLecturer.mockResolvedValue(new Schedule({ start, end, course, lecturer, students: [] }))

    // when
    const createSchedule = async () =>
        await scheduleService.createSchedule({ start, end, course, lecturer, students: [] })

    // then
    expect(createSchedule).rejects.toThrowError(
        'This course is already scheduled for this lecturer.'
    )
})