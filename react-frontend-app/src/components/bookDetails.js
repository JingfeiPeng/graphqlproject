import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getBookQuery } from '../queries/querires';


const BookDetails = ({bookId}) => {
    const {loading, error, data} = useQuery(getBookQuery,{
        variables:{
            id:bookId
        }
    })

    const displayBookDetails=()=>{
        let book = data.book;
        console.log(book)
        return (
            <div id="book-details">
                <h2>{book.name}</h2>
                <p>Book Genre: {book.genre}</p>
                <p>Author Name: {book.author.name}</p>
                <p>Books:</p>
                <ul>
                    {
                        book.author.books.map(authorBook =>(
                            <li key={authorBook.id} >{authorBook.name}</li>
                        ))
                    }
                </ul>
            </div>
        )
    }

    if (!data) return <p>No book selected yet</p>;
    return (
        <div id="book-details">
            <p>Book Details:</p>
            {displayBookDetails()}
        </div>
    );
}

export default BookDetails;
