import React from 'react';
import {gql} from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`


const AddBook = () => {
    const {loading, error, data} = useQuery(getAuthorsQuery)

    const displayBooks = () =>{
        let books = data.books;
        return books.map(book =>(
            <li key={book.id}>{book.name}</li>
        ))
    }
    
    // if (loading) return <p>Loading...</p>
    // if (error) return <p>Error: can't connect</p>

    return (
        <form id="add-book">
            <div className="field">
                <label>Book Name:</label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Genre: </label>
                <input type="text" />
            </div>
            <div className="field">
                <label>Author:</label>
                <select>
                    <option>1</option>
                    <option>2</option>
                </select>
            </div>
        </form>
    );
}

export default AddBook;
