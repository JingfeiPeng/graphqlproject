

// graphql is a package
const graphql = require('graphql')
const _ = require('lodash')

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

// static data for testing
const books = [
    {name: "Book number 1", genre:"Fantasy", id:"1", authorId:'1'},
    {name: "Book number 2", genre: "Fantasy", id:"2", authorId:"2"},
    {name:"The Long Earth", genre:"Sci-Fi", id:"3", authorId:"3"},
    {name:"The Hero of Ages", genre:"Fantasy", id:"4", authorId:"2"},
    {name:"Book number 5", genre:"Fantasy", id:"5", authorId:"3"},
    {name:"Book number 6", genre:"Fantasy", id:"6", authorId:"3"}
]

const authors = [
    {name: "Patrick Rothfuss", age: 44, id:"1"},
    {name: "Brandon Sanderson", age: 42, id:"2"},
    {name: "Terry Pratchett", age: 66, id:"3"}
]


const { GraphQLObjectType,
     GraphQLString, 
     GraphQLSchema,
     GraphQLID,
     GraphQLInt,
     GraphQLList
    }  = graphql; 

const BookType = new GraphQLObjectType({
    name: "Book", 
    fields: () =>({ // use function for order?
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type : GraphQLString },
        author: {
            type:AuthorType,
            resolve(parent, args){
                console.log(parent) // shows the author object
                return _.find(authors, {id: parent.id})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        age: {type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books,{
                    authorId: parent.id
                })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                // parent at the root is undefined
                let bookId = args.id;
                return _.find(books, {id: bookId})
            }
        },
        author:{
            type: AuthorType, 
            args: {id : {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        }, 
        books:{ // query a list of books
            type: GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})