const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRETSTRING,
  baseURL: 'http://trackgroceries.info',
  clientID: process.env.AUTH0CLIENTID,
  issuerBaseURL: process.env.BASEURL 
};

module.exports = authConfig;
