// graphql is a package
const graphql = require('graphql')

/* example query
book{
    name
    genre
}
book(id:"123"){
    name
    genre
}
*/

const { GraphQLObjectType, GraphQLString, GraphQLSchema }  = graphql; 

const BookType = new GraphQLObjectType({
    name: "Book", 
    fields: () =>({ // use function for order?
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type : GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString }},
            resolve(parent, args){
                let bookId = args.id;
                // to write code to get data from db/other sources

            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})