import scheduleDb from '../domain/data-access/schedule.db';
import { Schedule } from '../domain/model/schedule';

const getAllSchedules = async (): Promise<Schedule[]> => {
        return scheduleDb.getAllSchedules();
};

export default { getAllSchedules };
