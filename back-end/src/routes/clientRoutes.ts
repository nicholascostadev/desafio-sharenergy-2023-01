import { Router } from 'express'
import { ClientController } from '../controllers/ClientController'
import { authMiddleware } from '../middlewares/authMiddleware'

export const clientRoutes = Router()

const clientController = new ClientController()

clientRoutes.get('/', authMiddleware, clientController.get)

clientRoutes.get('/:clientId', authMiddleware, clientController.getById)

clientRoutes.post('/', authMiddleware, clientController.create)

clientRoutes.put('/:clientId', authMiddleware, clientController.update)

clientRoutes.delete('/:clientId', authMiddleware, clientController.delete)
