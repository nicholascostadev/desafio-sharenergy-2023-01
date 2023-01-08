import { RequestHandler } from 'express'
import { ClientService } from '../services/ClientService'
import { ZodError } from 'zod'
import { ClientModelInMemory } from '../models/ClientModelInMemory'
import { ClientModelPrisma } from '../models/ClientModelPrisma'

const model = process.env.NODE_ENV === 'test' ? new ClientModelInMemory() : new ClientModelPrisma()
const clientService = new ClientService(model)

export class ClientController {
  get: RequestHandler = async (req, res) => {
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

  getById: RequestHandler = async (req, res) => {
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

  create: RequestHandler = async (req, res) => {
    try {
      const data = await clientService.create(req)

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

  update: RequestHandler = async (req, res) => {
    try {
      const data = await clientService.update(req)

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

  delete: RequestHandler = async (req, res) => {
    try {
      const data = await clientService.delete(req)

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
