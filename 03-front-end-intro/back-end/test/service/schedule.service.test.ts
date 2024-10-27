import { set } from 'date-fns';
import courseDb from '../../domain/data-access/course.db';
import lecturerDb from '../../domain/data-access/lecturer.db';
import scheduleDb from '../../domain/data-access/schedule.db';
import { Course } from '../../domain/model/course';
import { Lecturer } from '../../domain/model/lecturer';
import { Schedule } from '../../domain/model/schedule';
import scheduleService from '../../service/schedule.service';

const start = set(new Date(), { hours: 8, minutes: 30 });
const end = set(new Date(), { hours: 10, minutes: 30 });
const course = new Course({
    name: 'Full-stack development',
    description: 'Learn how to develop a full-stack app',
    phase: 2,
    credits: 6,
});
const lecturer = new Lecturer({ id: 1, name: 'Johan Pieck', expertise: 'Software development' });

let mockScheduleDbCreateSchedule: jest.SpyInstance;
let mockScheduleDbGetScheduleByCourseAndLecturer: jest.SpyInstance;
let mockCourseDbGetCourseById: jest.SpyInstance;
let mockLecturerDbGetLecturerById: jest.SpyInstance;

beforeEach(() => {
    mockScheduleDbCreateSchedule = jest.spyOn(scheduleDb, 'createSchedule');
    mockScheduleDbGetScheduleByCourseAndLecturer = jest.spyOn(
        scheduleDb,
        'getScheduleByCourseAndLecturer'
    );
    mockCourseDbGetCourseById = jest.spyOn(courseDb, 'getCourseById');
    mockLecturerDbGetLecturerById = jest.spyOn(lecturerDb, 'getLecturerById');
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid schedule, when schedule is created, then schedule is created with those values', () => {
    // given
    mockCourseDbGetCourseById.mockReturnValue(course);
    mockLecturerDbGetLecturerById.mockReturnValue(lecturer);
    mockScheduleDbGetScheduleByCourseAndLecturer.mockReturnValue(null);

    // when
    scheduleService.createSchedule({ start, end, course, lecturer });

    // then
    expect(mockScheduleDbCreateSchedule).toHaveBeenCalledTimes(1);
    expect(mockScheduleDbCreateSchedule).toHaveBeenCalledWith(
        new Schedule({ start, end, course, lecturer, students: [] })
    );
});

test('given a schedule with an existing course and lecturer, when schedule is created, then an error is thrown', () => {
    // given
    mockCourseDbGetCourseById.mockReturnValue(course);
    mockLecturerDbGetLecturerById.mockReturnValue(lecturer);
    mockScheduleDbGetScheduleByCourseAndLecturer.mockReturnValue(
        new Schedule({ start, end, course, lecturer, students: [] })
    );

    // when
    const createSchedule = () => scheduleService.createSchedule({ start, end, course, lecturer });

    // then
    expect(createSchedule).toThrowError('This course is already scheduled for this lecturer.');
});
