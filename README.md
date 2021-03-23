# trackgroceries.info
I have recently started working, and want to keep an eye on how much I am spending for both weekly (grocery) and ad-hoc (work lunches, lollies).
A peice of paper is pretty effective for this, but there are some drawbacks overtime. Seemed like an ideal time to make a little web-tool to track
it and give me some summaries of it.

![Screenshot of Index Page](https://user-images.githubusercontent.com/59433949/112119934-af22c400-8c22-11eb-8055-dcbca4b8999f.png)
![Screenshot of first authenticated page](https://user-images.githubusercontent.com/59433949/112119957-b4800e80-8c22-11eb-8f06-1bca293f1b9f.png)

## Technologies Used
- Express
- MongoDB
- Auth0 (for authorisation)
- graphJS
- Morgan for Logging, and various other 
- Runs on "serverless" tested so far with 
  - DigitalOcean
  - Azure
  - Heroku

Both Mongo and Auth0 are services, and use environment variables for connection.

## Architecture
Standard HTTP api, that only uses two kinds of requests for now (POST, GET)

App is structured using the MVC design pattern.
Express queries the database, injects data into static pages and sends it back
as one big old html file with CSS and JS included.

Home route is unauthenticated (and shamelessly taken from HTML5UP)
All other routes are static pages made in the Neumorphism style.

Defos a work in progress.
