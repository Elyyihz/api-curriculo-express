import express from 'express';
import * as profileController from '../controllers/profileController.js';

const router = express.Router();

router.get('/', profileController.getProfile);
router.post('/', profileController.createProfile);
router.put('/', profileController.updateProfile);
router.delete('/', profileController.deleteProfile);

export default router;