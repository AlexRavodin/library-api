import {Router} from 'express';

import {destroy, edit, list, show} from 'controllers/authors';
import {checkJwt} from "../../middleware/checkJwt";
import {checkRole} from "../../middleware/checkRole";

const router = Router();

router.get('/', list);

router.get('/:id([0-9]+)', show);

router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], edit);

router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

export default router;
