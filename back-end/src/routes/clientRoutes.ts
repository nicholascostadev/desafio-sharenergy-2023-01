import { Router } from 'express'
import { ClientController } from '../controllers/ClientController'
import { authMiddleware } from '../middlewares/authMiddleware'

export const clientRoutes = Router()

// .../clients
clientRoutes.get('/', authMiddleware, ClientController.get)

clientRoutes.get('/:clientId', authMiddleware, ClientController.getById)
