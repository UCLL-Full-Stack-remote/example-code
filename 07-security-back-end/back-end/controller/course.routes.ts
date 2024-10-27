/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Course:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Course name.
 *            description:
 *              type: string
 *              description: Course description.
 *            phase:
 *              type: number
 *              description: Course name.
 *            credits:
 *              type: number
 *              description: Course credits.
 */
import express, { NextFunction, Request, Response } from 'express';
import courseService from '../service/course.service';

const courseRouter = express.Router();

/**
 * @swagger
 * /courses/{id}:
 *  get:
 *      security:
 *         - bearerAuth: []
 *      summary: Get a course by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The course id.
 *      responses:
 *          200:
 *              description: A course object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Course'
 */
courseRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const course = await courseService.getCourseById(Number(req.params.id));
        res.status(200).json(course);
    } catch (error) {
        next(error);
    }
});

export { courseRouter };
