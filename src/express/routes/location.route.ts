import * as express from 'express';
import { wrapController } from '../utils/wraps';
import * as locationController from '../controllers/location.controller';
import isAuth from '../../auth/auth';
const router = express.Router();

// authorize user
router.use(isAuth);

// get all
router.get('', wrapController(locationController.getAllLocations));
// get by id
router.get('/id/:id', wrapController(locationController.getLocation));

//get all location with filter
router.get('/filter', wrapController(locationController.getAllLocationsWithFilter));

export default router;
