import { Router } from 'express';

import { list, show, edit, destroy } from 'controllers/books';
import {listRandom} from "../../controllers/books/random";
import {create} from "../../controllers/books/create";
import {checkJwt} from "../../middleware/checkJwt";
import {checkRole} from "../../middleware/checkRole";

const router = Router();

router.get('/', list);

router.post('/', [checkJwt], create);

router.get('/random', listRandom);

router.get('/:id([0-9]+)', show);

router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], edit);

router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], destroy);

export default router;
