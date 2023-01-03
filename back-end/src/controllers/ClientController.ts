import { RequestHandler } from 'express'
import { ClientService } from '../services/ClientService'
import { ClientModelPrisma } from '../models/ClientModelPrisma'
import { ZodError } from 'zod'

const model = new ClientModelPrisma()
const clientService = new ClientService(model)

export class ClientController {
  static get: RequestHandler = async (req, res) => {
    try {
      const data = await clientService.get(req)

      return res.status(200).json({
        message: 'Success',
        data
      })
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation Error',
          error: err.issues.map(issue => issue.message)
        })
      }

      return res.status(400).json({
        message: 'Error',
        error: err
      })
    }
  }

  static getById: RequestHandler = async (req, res) => {
    try {
      const data = await clientService.getById(req)

      return res.status(200).json({
        message: 'Success',
        data
      })
    } catch (err) {
      return res.status(400).json({
        message: 'Error',
        error: err
      })
    }
  }
}
