import { Course } from '../domain/model/course';
import courseDB from '../domain/data-access/course.db';

const getCourseById = async (id: number): Promise<Course> => {
    const course = await courseDB.getCourseById({ id });
    if (!course) throw new Error(`Course with id ${id} does not exist.`);
    return course;
};

export default { getCourseById };
