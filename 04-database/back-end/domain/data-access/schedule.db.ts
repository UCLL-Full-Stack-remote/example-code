import database from '../../util/database';
import { Schedule } from '../model/schedule';

const getAllSchedules = async (): Promise<Schedule[]> => {
    try {
        const schedulesPrisma = await database.schedule.findMany({
            include: {
                course: true,
            },
        });
        return schedulesPrisma.map((schedulePrisma) => Schedule.from(schedulePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllSchedules,
};
