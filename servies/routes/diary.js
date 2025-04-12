import express from 'express';
import { 
  getAllDiary,
  getDiaryById,
  createDiary,
  deleteDiary,
  updateDiary,
  getDiaryByDate
 } from '../controllers/diaryControllers.js';

const router = express.Router();

router.post('/', createDiary);
router.get('/', getAllDiary); //弃用总览
// router.get('/:id', getDiaryById);
// router.get('/date/:beWriteDate', getDiaryByDate);
router.get('/:param', (req, res, next) => {
  const param = req.params.param;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  // console.log(datePattern.test(param));

  if (datePattern.test(param)) {
      return getDiaryByDate(req, res, next);
  } else {
      return getDiaryById(req, res, next);
  }
});
router.delete('/:id', deleteDiary);
router.patch('/:id', updateDiary);

export default router;