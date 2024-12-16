import {Router} from 'express';

import {list, show, destroy} from 'controllers/genres';
import {checkJwt} from "../../middleware/checkJwt";
import {checkRole} from "../../middleware/checkRole";

const router = Router();

router.get('/', list);

router.get('/:id([0-9]+)', show);

router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

export default router;
