import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

export const authRoutes = Router()

const authController = new AuthController()

authRoutes.post('/login', authController.login)

authRoutes.post('/validate', authController.validateToken)
