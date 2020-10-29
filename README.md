# Express Bookmarks Server

## Requirements

Complete the following steps:

1. Configure logging and API key handling middleware on the server

2. Write a route handler for the endpoint `GET /bookmarks` that returns a list of bookmarks

3. Write a route handler for the endpoint `GET /bookmarks/:id` that returns a single bookmark with the given ID, return 404 Not Found if the ID is not valid

4. Write a route handler for `POST /bookmarks` that accepts a JSON object representing a bookmark and adds it to the list of bookmarks after validation.

5. Write a route handler for the endpoint `DELETE /bookmarks/:id` that deletes the bookmark with the given ID.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.