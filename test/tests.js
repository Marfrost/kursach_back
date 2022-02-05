const assert  = require('assert')
const fetch=require('node-fetch')
const { describe, it } = require('mocha')

const baseUrl='https://205a-37-73-40-178.ngrok.io/api/v1.1/'

describe('tests', function(){
    it('should create user', async function(){
        const response=await fetch(baseUrl+"user", {
            headers:{},
            method:'POST',
            body:{
                "username":"1",
                "password":"1234",
                "role":"User",
                "email":"1@1.com"
            }
        } )

        assert.strictEqual(response.status, 200)
    })
})