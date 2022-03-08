import express from 'express';
import publicDir from '../constant';

const router = express.Router();

router.get('/', function (req: any, res: any, next: Function) {
  res.sendFile('index.html', { root: publicDir });
});

export default router;
