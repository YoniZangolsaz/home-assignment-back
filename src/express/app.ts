import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';

// import blogRouter from './routes/blog.route';
import userRouter from './routes/user.route';
import characterRouter from './routes/character.route';
import config from '../config/index';
import { errorMiddleware } from './utils/error';
import checkConnection from './utils/checkConnections';
import locationRouter from './routes/location.route';
import episodeRouter from './routes/episode.route';

require('dotenv').config();

const { port } = config.server || 6060;

/**
 * Initializing the express server
 */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(cors({ origin: '*', credentials: true }));

app.use('/users', userRouter);
app.use('/character', characterRouter);
app.use('/location', locationRouter);
app.use('/episode', episodeRouter);

app.use(errorMiddleware);

app.use('/isAlive', (_req, res) => {
    res.send(checkConnection() ? 'OK' : 'Not OK');
});

app.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default () => {
    app.listen(port, () => {
        console.log(`listening at http://localhost:${port}`);
    });
};
