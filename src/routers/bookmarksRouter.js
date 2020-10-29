const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('../logger')
const BOOKMARKS = require('../exampleRes.json')

const bookmarksRouter = express.Router()

const bookmarks = BOOKMARKS.bookmarks;

bookmarksRouter.route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks)
    })
    .post((req, res) => {
        const { title, url, description, rating } = req.body
        if (!title) {
            logger.error(`Title is required`);
            return res.status(400).send('Invalid data')
        }
        if (!url) {
            logger.error(`URL is required`);
            return res.status(400).send('Invalid data')
        }
        const id = uuid();
        const bookmark = { id, title, url, description, rating };
        bookmarks.push(bookmark)
        logger.info(`Bookmark ${id} added`);
        res.status(201).location(`http://localhost:8000/card/${id}`).json(bookmark);
    })

module.exports = bookmarksRouter;