import express from 'express';
import {shortenUrl, listLinks} from '../controller/ShortCode.ts';

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/links", listLinks);

export default router