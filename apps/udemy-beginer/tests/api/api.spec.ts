import { test, expect } from '@playwright/test'

test.describe.parallel('API Testing', () => {
  const baseUrl = 'https://reqres.in/api'
  test('Simple API Test - Assert Response Status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`)
    expect(response.status()).toBe(200)
  })
  test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-exist-endpoint`)
    expect(response.status()).toBe(404)
  })
  test('Get Request User Detail', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`)
    const responseBpdy = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBpdy.data.id).toBe(1)
    expect(responseBpdy.data.first_name).toBe('George')
    expect(responseBpdy.data.last_name).toBe('Bluth')
  })

  test('Post Request - Create New User', async ({ request }) => {
    const response = await request.post(`${baseUrl}/users`, {
      data: {
        name: 'Randy',
        job: 'Developer',
        id: 10000,
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.id).toBe(10000)
    expect(responseBody.createdAt).toBeTruthy()
  })
  test('Post Request - Login', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy()
  })
  test('Post Request - Login Fail', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'peter@klaven',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('Missing password')
  })
  test('Put Request - Update User', async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`, {
      data: {
        name: 'morpheus',
        job: 'zion resident',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe('morpheus')
  })
  test('Delete Request - Delete User', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/2`)
    expect(response.status()).toBe(204)
  })
})
