const express = require('express')
const graphqlHTTP = require('express-graphql') // this is a a function
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const credential = require('./mlabCredentials')

const app = express();

mongoose.connect(credential)
mongoose.connection.once('open', ()=>{
    console.log("Connected to mlab mongodb database")
})

// need to pass in schema in graphqlHTTP
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true // use graphical tool
})) 

app.listen(4000, ()=>{
    console.log("Listening for request on localhost:4000")
})



