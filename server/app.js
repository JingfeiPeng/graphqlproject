const express = require('express')
const graphqlHTTP = require('express-graphql') // this is a a function
const schema = require('./schema/schema')

const app = express();

// need to pass in schema in graphqlHTTP
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true // use graphical tool
})) 

app.listen(4000, ()=>{
    console.log("Listening for request on localhost:4000")
})



