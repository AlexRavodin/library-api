import { Router } from 'express';

import auth from './auth';
import users from './users';
import books from "./books";
import authors from "./authors";
import genres from "./genres";
import loans from "./loans";

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/books', books);
router.use('/loans', loans);
router.use('/authors', authors);
router.use('/genres', genres);

export default router;
