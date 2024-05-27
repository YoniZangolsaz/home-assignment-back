import * as express from 'express';
import { wrapController } from '../utils/wraps';
import * as characterController from '../controllers/character.controller';
import isAuth from '../../auth/auth';
const router = express.Router();

// authorize user
router.use(isAuth);

// get all
router.get('', wrapController(characterController.getAllCharacters));
// get by id
router.get('/id/:id', wrapController(characterController.getCharacter));

//get all characters with filter
router.get('/filter', wrapController(characterController.getAllCharactersWithFilter));

export default router;
