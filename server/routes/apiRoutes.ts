import express from 'express';
import shortenUrl from '../controller/ShortCode';

const router = express.Router();

router.post("/shorten", shortenUrl);

export default router