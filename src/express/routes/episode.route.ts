import * as express from 'express';
import { wrapController } from '../utils/wraps';
import * as episodeController from '../controllers/episode.controller';
import isAuth from '../../auth/auth';
const router = express.Router();

// authorize user
router.use(isAuth);

// get all
router.get('', wrapController(episodeController.getAllEpisodes));
// get by id
router.get('/id/:id', wrapController(episodeController.getEpisode));
//get all episode with filter
router.get('/filter', wrapController(episodeController.getAllEpisodesWithFilter));

export default router;
