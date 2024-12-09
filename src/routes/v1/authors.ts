import {Router} from 'express';

import {destroy, edit, list, show} from 'controllers/authors';

const router = Router();

router.get('/', list);

router.get('/:id([0-9]+)', show);

router.patch('/:id([0-9]+)', edit);

router.delete('/:id([0-9]+)', destroy);

export default router;
