const express = require('express')

const cardRouter = express.Router()
const bodyParser = express.json()

const BOOKMARKS = require('../exampleRes.json')




const bookmarks = BOOKMARKS.bookmarks;


app.get('/bookmarks/:id', (req, res) => {
    const { id } = req.params;
    const bookmark = bookmarks.find(c => c.id == id);
    if (!bookmark) {
        logger.error(`Bookmark with id ${id} not found.`);
        return res
            .status(404)
            .send('Bookmark not found')
    }
    res.json(bookmark);
})

app.delete('/bookmarks/:id', (req, res) => {
    const { id } = req.params;
    const bookmarkIndex = bookmarks.findIndex(li => li.id == id);
    if (bookmarkIndex === -1) {
        logger.error(`Bookmark ${id} not found.`);
        return res.status(404).send('Not Found')
    }
    bookmarks.splice(bookmarkIndex, 1);
    logger.info(`Bookmark ${id} deleted.`);
    res.status(204).end();
});

