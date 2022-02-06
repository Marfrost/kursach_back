const { assert, expect } = require('chai')
const fetch = require('node-fetch')
const { describe, it } = require('mocha');
const { response } = require('express');

const baseUrl = 'http://localhost:9999/api/v1.1/'
let token = ''
let userId=0
const postApi = function (endpoint, body) {
    return fetch(baseUrl + endpoint, {
        headers: {
            'Content-Type': "application/json",
            "Authorization": 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify(body)
    })
}
const getApi = function (endpoint, body) {
    return fetch(baseUrl + endpoint, {
        headers: {
            'Content-Type': "application/json",
            "Authorization": 'Bearer ' + token
        },
        method: 'GET'
    })
}

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
        token = json['token']
        userId=json.user.id
        console.log(userId)
    });

    it('should create test values', async function () {
        let response = await postApi("author", {
            "name": "Ernest Hemingway",
            "description": "Ernest Miller Hemingway (July 21, 1899 – July 2, 1961) was an American novelist, short-story writer, journalist, and sportsman.",
        })

        let id1 = await response.json()[0]

        response = await postApi("author", {
            "name": "Franz Kafka",
            "description": "Franz Kafka (3 July 1883 – 3 June 1924) was a German-speaking Bohemian novelist and short-story writer, widely regarded as one of the major figures of 20th-century literature.",
        })
        let id2 = await response.json()[0]
        assert.isTrue(true)

    });
    it('should create test values', async function () {

        let response = await postApi("book", {
            name: "Metamorphosis ",
            description: "Gregor Samsa wakes up one morning to find himself transformed into a 'monstrous vermin'",
            year: 1915,
            pages: 100,
            author: 3,
            price: 420
        })

        response = await postApi("book", {
            name: "The Castle ",
            description: "The protagonist, K., arrives in a village governed by a mysterious bureaucracy operating in a nearby castle. When seeking shelter at the town inn, he claims to be a land surveyor summoned by the castle authorities. ",
            year: 1926,
            pages: 250,
            author: 3,
            price: 1000
        })


        response = await postApi("book", {
            name: "For Whom the Bell Tolls ",
            description: '"For Whom the Bell Tolls" is a song by American heavy metal band Metallica. It was first released on the group\'s second album, Ride the Lightning',
            year: 1940,
            pages: 300,
            author: 2,
            price: 690
        })
        response = await postApi("book", {
            name: "The Old Man and the Sea",
            description: 'ntiago is an aging, experienced fisherman who has gone eighty-four days without catching a fish. He is now seen as "salao" (colloquial pronunciation of "salado", which means salty), the worst form of unlucky. ',
            year: 1952,
            pages: 200,
            author: 2,
            price: 9000
        })


        assert.isTrue(true)
    })

    it('should create test values', async function () {

        let response = await getApi("book/all")
        let json = await response.json();
        let book1 = json.filter(x => x.name == "For Whom the Bell Tolls ")[0]
        let book2 = json.filter(x => x.name == "Metamorphosis ")[0]

        response = await postApi("order",
            { user: userId , book: book1.id , quantity:100 ,status :"New"}
        )
        response = await postApi("order",
            { user: userId , book: book2.id , quantity:200,status:"New" }
        )

        console.log(await response.text())

        assert.isTrue(true)
    })
})