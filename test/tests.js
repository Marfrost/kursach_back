const { assert, expect } = require('chai')
const fetch = require('node-fetch')
const { describe, it } = require('mocha');

const baseUrl = 'https://205a-37-73-40-178.ngrok.io/api/v1.1/'

describe('tests', function () {
    it('should create user', async function () {
        const response = await fetch(baseUrl + "user", {
            headers: {
                'Content-Type': "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                "username": "1",
                "password": "1234",
                "role": "User",
                "email": "1@1.com"
            })
        })

        assert.equal(response.status, 200)
    });
    it('should login', async function () {
        const response = await fetch(baseUrl + "user/auth", {
            headers: {
                'Content-Type': "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                "email": "1@1.com",
                "password": "1234",
            })
        })

        let json = await response.json();
        assert.equal(response.status, 200)
        expect(json['token']).to.be.a('string');
    });
})