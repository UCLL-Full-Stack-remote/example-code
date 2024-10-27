import { Schedule, Student } from '@types';

const getToken = (): string => {
  const loggedInUserString = sessionStorage.getItem('loggedInUser');
  return loggedInUserString ? JSON.parse(loggedInUserString).token : '';
};

const getSchedule = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/schedules', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

const enrollStudent = (schedule: Schedule, student: Student) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/schedules/enroll', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      schedule,
      students: [student],
    }),
  });
};

const createSchedule = (schedule: Schedule) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/schedules', {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(schedule),
  });
};

const ScheduleService = {
  getSchedule,
  enrollStudent,
  createSchedule,
};

export default ScheduleService;
