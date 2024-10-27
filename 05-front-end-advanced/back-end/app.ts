import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { courseRouter } from './controller/course.routes';
import { lecturerRouter } from './controller/lecturer.routes';
import { scheduleRouter } from './controller/schedule.routes';
import { studentRouter } from './controller/student.routes';
import { userRouter } from './controller/user.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use('/lecturers', lecturerRouter);
app.use('/courses', courseRouter);
app.use('/schedules', scheduleRouter);
app.use('/students', studentRouter);
app.use('/users', userRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Courses API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Courses API is running on port ${port}.`);
});
