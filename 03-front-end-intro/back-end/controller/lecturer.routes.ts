/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Lecturer:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Lecturer name.
 *            expertise:
 *              type: string
 *              description: Lecturer expertise.
 */
import express, { Request, Response } from 'express';
import lecturerService from '../service/lecturer.service';

const lecturerRouter = express.Router();

/**
 * @swagger
 * /lecturers:
 *   get:
 *     summary: Get a list of all lecturers.
 *     responses:
 *       200:
 *         description: A list of lecturers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Lecturer'
 */
lecturerRouter.get('/', (req: Request, res: Response) => {
    try {
        const lecturers = lecturerService.getAllLecturers();
        res.status(200).json(lecturers);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /lecturers/{id}:
 *  get:
 *      summary: Get a lecturer by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The lecturer id.
 *      responses:
 *          200:
 *              description: A lecturer object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Lecturer'
 */
lecturerRouter.get('/:id', (req: Request, res: Response) => {
    try {
        const lecturer = lecturerService.getLecturerById(Number(req.params.id));
        res.status(200).json(lecturer);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { lecturerRouter };
