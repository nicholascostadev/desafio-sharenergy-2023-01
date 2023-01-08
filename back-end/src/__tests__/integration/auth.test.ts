import { app } from '../../app'
import request from 'supertest'

describe('Auth Integration', () => {
  it('Should return 400 when received data is not valid', async () => {
    const response = await request(app).post('/auth/login').send({
      login: '',
      password: ''
    })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('error')
  })

  it('Should return 401 when received wrong email or password', async () => {
    const response = await request(app).post('/auth/login').send({
      login: 'johndoe',
      password: 'johndoe123123'
    })

    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('error')
  })

  it('Should return 200 and token when received correct login and password', async () => {
    const response = await request(app).post('/auth/login').send({
      login: 'desafiosharenergy',
      password: 'sh@r3n3rgy'
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('message')
  })
})
