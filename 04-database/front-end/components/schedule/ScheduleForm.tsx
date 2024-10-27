import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ScheduleService from '@services/ScheduleService';
import { Course, Lecturer } from '@types';

type Props = {
  lecturer: Lecturer;
  course: Course;
};

const ScheduleForm = ({ lecturer, course }: Props) => {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');

  const validate = () => {
    let result = true;
    setErrors([]);

    if (!start) {
      setErrors((errors) => [...errors, 'Start date is required.']);
      result = false;
    }
    if (!end) {
      setErrors((errors) => [...errors, 'End date is required.']);
      result = false;
    }
    if (start && end && start > end) {
      setErrors((errors) => [...errors, 'Start date must be before end date.']);
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const schedule = {
      start,
      end,
      lecturer,
      course,
      students: [],
    };

    const response = await ScheduleService.createSchedule(schedule);
    const data = await response.json();
    if (!response.ok) {
      setErrors((errors) => [...errors, data.message]);
    } else {
      setStatus('Schedule created successfully.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="row mb-3">
        {!!errors.length && (
          <ul className="alert alert-danger" role="alert">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {status && (
          <p className="alert alert-success" role="alert">
            {status}
          </p>
        )}
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Course:</label>
        <div className="col-sm-8">
          <input
            type="text"
            value={course ? course.name : ''}
            disabled
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Lecturer:</label>
        <div className="col-sm-8">
          <input
            type="text"
            value={
              lecturer
                ? `${lecturer.user.firstName} ${lecturer.user.lastName}`
                : ''
            }
            disabled
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label">Start Date:</label>
        <div className="col-sm-8">
          <DatePicker
            selected={start}
            onChange={(date) => setStart(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy HH:mm"
            timeFormat="HH:mm"
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-4 col-form-label">End Date:</label>
        <div className="col-sm-8">
          <DatePicker
            selected={end}
            onChange={(date) => setEnd(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy HH:mm"
            timeFormat="HH:mm"
            className="form-control"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Create Schedule
      </button>
    </form>
  );
};

export default ScheduleForm;
