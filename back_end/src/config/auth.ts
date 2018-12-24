const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

export const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://asfal.auth0.com/.well-known/jwks.json"
  }),
  audience: "http://localhost:3000/",
  issuer: "https://asfal.auth0.com/",
  algorithms: ["RS256"]
});