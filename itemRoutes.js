const express = require('express');
const router = new express.Router();
const items = require('./fakeDb');

router.get('/', (request, response) => {
    return response.json({ items: items });
});

router.post('/', (request, response) => {
    const newItem = request.body;
    items.push(newItem);
    return response.status(201).json({ added: newItem });
});

router.get('/:name', (request, response) => {
    for (let item of items) {
        if (item.name === request.params.name) {
            return response.json(item);
        }
    }
    return response.status(404).json({ message: `${request.params.name} not found!` });
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
    return response.status(404).json({ message: `${request.params.name} not found!` });
});

router.delete('/:name', (request, response) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].name === request.params.name) {
            items.splice(i, 1);
            return response.json({ message: 'deleted' });
        }
    }
    return response.status(404).json({ message: `${request.params.name} not found!` });
});

module.exports = router;