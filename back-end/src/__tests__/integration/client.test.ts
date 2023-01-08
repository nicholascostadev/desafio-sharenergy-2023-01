import { app } from '../../app'
import request from 'supertest'
import { fakeLogin } from '../utils/login'
import { clientFactory } from '../factories/client'

describe('Clients Integration', () => {
  const fetch = request(app)

  let token: string

  beforeAll(async () => {
    token = await fakeLogin(app).then(res => res.token)
  })

  describe('GET /clients', () => {
    it('Should return 400 when does not have an authorization token', async () => {
      const response = await fetch.get('/clients')

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Error')
      expect(response.body).toHaveProperty('error')
    })

    it('Should return 200 when does have an authorization token', async () => {
      const response = await fetch.get('/clients').set({
        authorization: `Bearer ${token}`
      })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Success')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('clients')
      expect(response.body.data).toHaveProperty('totalPages')
    })
  })

  describe('POST /clients', () => {
    it('Should not be able to create a client when does not have authorization', async () => {
      const response = await fetch.get('/clients')

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Error')
      expect(response.body).toHaveProperty('error')
    })

    it('Should be able to create a client when has authorizatioon', async () => {
      const createdUser = await fetch.post('/clients').set({
        authorization: `Bearer ${token}`
      }).send(clientFactory()).then(res => res.body)

      const response = await fetch.get('/clients').set({
        authorization: `Bearer ${token}`
      })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Success')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('clients')
      expect(response.body.data).toHaveProperty('totalPages')
      expect(response.body.data.clients).toEqual(expect.arrayContaining([
        expect.objectContaining(createdUser.data)
      ]))
    })
  })

  describe('PUT /clients/:id', () => {
    it('Should not be able to update a client when does not have an authorization token', async () => {
      const response = await fetch.get('/clients')

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Error')
      expect(response.body).toHaveProperty('error')
    })

    it('Should be able to update a client when has authorization', async () => {
      const initialClients = await fetch.get('/clients').set({
        authorization: `Bearer ${token}`
      }).then(res => res.body.data.clients)

      const response = await fetch.put(`/clients/${initialClients[0].id as string}`).set({
        authorization: `Bearer ${token}`
      }).send(clientFactory())

      const currentClients = await fetch.get('/clients').set({
        authorization: `Bearer ${token}`
      }).then(res => res.body.data.clients)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Success')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('id', response.body.data.id)
      expect(currentClients).toEqual(expect.arrayContaining([
        expect.objectContaining(response.body.data)
      ]))
    })
  })

  describe('DELETE /clients/:id', () => {
    it('Should not be able to delete a client when does not have an authorization token', async () => {
      const response = await fetch.get('/clients')

      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Error')
      expect(response.body).toHaveProperty('error')
    })

    it('Should be able to delete a client when has authorization', async () => {
      const initialClients = await fetch.get('/clients').set({
        authorization: `Bearer ${token}`
      }).then(res => res.body.data.clients)

      const response = await fetch.delete(`/clients/${initialClients[0].id as string}`).set({
        authorization: `Bearer ${token}`
      })

      const currentClients = await fetch.get('/clients').set({
        authorization: `Bearer ${token}`
      }).then(res => res.body.data.clients)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Success')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('id', response.body.data.id)
      expect(currentClients).not.toEqual(expect.arrayContaining([
        expect.objectContaining(response.body.data)
      ]))
    })
  })
})
