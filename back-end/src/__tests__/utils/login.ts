import request from 'supertest'

export const fakeLogin = async (app: any) => {
  const res = await request(app).post('/auth/login').send({
    login: 'desafiosharenergy',
    password: 'sh@r3n3rgy'
  }).then(res => res.body)

  return res as { token: string }
}
