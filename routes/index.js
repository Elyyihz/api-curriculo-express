import express from 'express';
import authMiddleware from '../middleware/auth.js';

import authRoutes from './authRoutes.js';
import profileRoutes from './profileRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import educationRoutes from './educationRoutes.js';
import projectRoutes from './projectRoutes.js';
import skillRoutes from './skillRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/profiles', authMiddleware, profileRoutes);
router.use('/experience', authMiddleware, experienceRoutes);
router.use('/education', authMiddleware, educationRoutes);
router.use('/project', authMiddleware, projectRoutes);
router.use('/skill', authMiddleware, skillRoutes);

export default router;