process.env.NODE_ENV = 'test';
const request = require('supertest');

const app = require('./app');
const items = require('./fakeDb');

const popsicle = { name: 'popsicle', price: 1.45 };
const cheerios = { name: 'cheerios', price: 3.40 };

beforeEach(function () {
    popsicle.name = 'popsicle';
    popsicle.price = 1.45;
    cheerios.name = 'cheerios';
    cheerios.price = 3.40;

    items.length = 0;
    items.push(popsicle);
    items.push(cheerios);
})

describe('GET /items', function () {
    test('Get full list of items', async function () {
        const res = await request(app).get(`/items`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: items });
    });
});

describe('POST /items', function () {
    test('Post new item to list', async function () {
        const eggs = { name: 'eggs', price: '1.25' };
        const res = await request(app).post('/items').send(eggs);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ added: eggs });
        expect(items).toEqual([popsicle, cheerios, eggs]);
    });
});

describe('GET /items/:name', function () {
    test('Get single item by name', async function () {
        const res1 = await request(app).get('/items/popsicle');
        expect(res1.statusCode).toBe(200);
        expect(res1.body).toEqual(popsicle);

        const res2 = await request(app).get('/items/cheerios');
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toEqual(cheerios);
    });

    test('Responds with 404 if item not found', async function () {
        const res = await request(app).get('/items/eggs');
        expect(res.statusCode).toBe(404);
    });
});

describe('PATCH /items/:name', function () {
    test('Update an item by name', async function () {
        const res1 = await request(app).patch('/items/popsicle').send({ name: 'ice cream bar' });
        expect(res1.statusCode).toBe(200);
        expect(res1.body).toEqual({ updated: { name: 'ice cream bar', price: 1.45 } });
        expect(items).toEqual([{ name: 'ice cream bar', price: 1.45 }, cheerios])

        const res2 = await request(app).patch('/items/cheerios').send({ price: 3.25 });
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toEqual({ updated: { name: 'cheerios', price: 3.25 } });
        expect(items).toEqual([{ name: 'ice cream bar', price: 1.45 },
            { name: 'cheerios', price: 3.25 }]);
    });

    test('Responds with 404 if item not found', async function () {
        const res = await request(app).get('/items/eggs');
        expect(res.statusCode).toBe(404);
    });
});

describe('DELETE /items/:name', function () {
    test('Delete an item by name', async function () {
        const deleteMessage = { message: 'deleted' };

        const res1 = await request(app).delete('/items/popsicle');
        expect(res1.statusCode).toBe(200);
        expect(res1.body).toEqual(deleteMessage);
        expect(items).toEqual([cheerios]);

        const res2 = await request(app).delete('/items/cheerios');
        expect(res2.statusCode).toBe(200);
        expect(res2.body).toEqual(deleteMessage);
        expect(items).toEqual([]);
    });

    test('Responds with 404 if item not found', async function () {
        const res = await request(app).get('/items/eggs');
        expect(res.statusCode).toBe(404);
    });
});