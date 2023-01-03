import { Router } from 'express'
import { authRoutes } from './authRoutes'
import { clientRoutes } from './clientRoutes'

export const router = Router()

router.use('/auth', authRoutes)
router.use('/clients', clientRoutes)
