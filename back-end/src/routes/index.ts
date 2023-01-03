import { Router } from 'express'
import { authRoutes } from './authRoutes'

export const router = Router()

router.use('/auth', authRoutes)
