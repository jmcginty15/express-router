const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');

router.get('/', (request, response) => {
    return response.json({ items: items });
});

router.post('/', (request, response) => {
    const newItem = request.body;
    items.push(newItem);
    return response.json({ added: newItem });
});

router.get('/:name', (request, response) => {
    for (let item of items) {
        if (item.name === request.params.name) {
            return response.json(item);
        }
    }
});

router.patch('/:name', (request, response) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].name === request.params.name) {
            if (request.body.name) {
                items[i].name = request.body.name;
            }
            if (request.body.price) {
                items[i].price = request.body.price;
            }
            return response.json({ updated: items[i] });
        }
    }
});

router.delete('/:name', (request, response) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].name === request.params.name) {
            items.splice(i, 1);
            return response.json({ message: 'deleted' });
        }
    }
});

module.exports = router;