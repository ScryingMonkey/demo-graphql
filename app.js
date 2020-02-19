const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

const isAuth = require("./middleware/isauth");

const app = express();
app.use(bodyParser.json());
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

const mongoconnectionstring = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-k0dms.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
console.log("Connecting to database...");
mongoose
  .connect(mongoconnectionstring)
  .then(() => {
    console.log("...successfully connected to database.");
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(
      `...failed. Attempted to connect as user [${process.env.MONGO_USER}]`
    );
    console.log(err);
  });
