

// graphql is a package
const graphql = require('graphql')
const _ = require('lodash')
const Book = require("../models/book")
const Author = require("../models/author")

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

// // static data for testing
// const books = [
//     {name: "Book number 1", genre:"Fantasy", id:"1", authorId:'1'},
//     {name: "Book number 2", genre: "Fantasy", id:"2", authorId:"2"},
//     {name:"The Long Earth", genre:"Sci-Fi", id:"3", authorId:"3"},
//     {name:"The Hero of Ages", genre:"Fantasy", id:"4", authorId:"2"},
//     {name:"Book number 5", genre:"Fantasy", id:"5", authorId:"3"},
//     {name:"Book number 6", genre:"Fantasy", id:"6", authorId:"3"}
// ]

// const authors = [
//     {name: "Patrick Rothfuss", age: 44, id:"1"},
//     {name: "Brandon Sanderson", age: 42, id:"2"},
//     {name: "Terry Pratchett", age: 66, id:"3"}
// ]


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
                // console.log(parent) // shows the author object
                return Author.findById(parent.authorId)
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
                // return _.filter(books,{
                //     authorId: parent.id
                // })
                return Book.find({
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
                // // parent at the root is undefined
                // let bookId = args.id;
                return Book.findById(args.id)
            }
        },
        author:{
            type: AuthorType, 
            args: {id : {type: GraphQLID}},
            resolve(parent, args){
                return Author.findById(args.id)
            }
        }, 
        books:{ // query a list of books
            type: GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({}) // return all of them since it's {}
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({})
            }
        }
    }
})

/*
Mutation{
    addBook(
        name:"Brandon Sanderson's book",
        genre:"Sci-Fic",
        authorId:"5dee9be0f89dd884e576af46" ){
        name,
        genre
    }
}
*/

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addAuthor:{
            type: AuthorType,
            args:{
                name: { type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                // use the MongoDB Author schema to create new data type
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook:{
            type: BookType,
            args:{
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save() 
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})