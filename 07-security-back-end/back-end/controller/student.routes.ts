/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Student:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            user:
 *              $ref: '#/components/schemas/User'
 *            studentnumber:
 *              type: string
 *              description: Student number.
 */
import express, { NextFunction, Request, Response } from 'express';
import studentService from '../service/student.service';

const studentRouter = express.Router();

/**
 * @swagger
 * /students:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a list of all students.
 *     responses:
 *       200:
 *         description: A list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Student'
 */
studentRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
});

export { studentRouter };
