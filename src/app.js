require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const winston = require('winston');
const { v4: uuid } = require('uuid');
const { NODE_ENV } = require('./config');
const bookmarksRouter=require('./routers/bookmarksRouter');
const bookmarksIDRouter=require('./routers/bookmarksIDRouter');



/*************************LOGGING********************************** */

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'info.log' })
    ]
})
if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

/************************MIDDLEWARE************************************* */

const app = express()

const morganOption = (NODE_ENV === 'production') ? 'tiny' : "common";

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        logger.error(`Unauthorized request to path: ${req.path}`);
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
})



/*************************ENDPOINTS******************************* */

app.use(bookmarksRouter)
app.use(bookmarksIDRouter)


bookmarksIDRouter.route('/bookmarks/:id')
    .get((req, res) => { })
    .delete((req, res) => { })




/**/

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


/***********************ERROR**************** */

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
})



module.exports = app;