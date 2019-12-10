import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import {getBooksQuery} from '../queries/querires'
import BookDetails from './bookDetails';


const BookList = () => {
    const {loading, error, data} = useQuery(getBooksQuery)
    const [selected, setSelected] = useState("")

    const displayBooks = () =>{
        let books = data.books;
        return books.map(book =>(
            <li  onClick={e => setSelected(book.id) } key={book.id}>
                {book.name}
            </li>
        ))
    }
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: can't connect</p>

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={selected} />
        </div>
    );
}

export default BookList;
