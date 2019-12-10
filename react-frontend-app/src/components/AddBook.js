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

    const displayAuthors = () =>{
        if (loading) return <option>Loading Authors...</option>
        
        let authors = data.authors;
        return authors.map(author => (
            <option key={author.id} value={author.id}>
                {author.name}
            </option>
        ))
    }
    
    if (error) return <p>Error: can't connect</p>

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
                    {displayAuthors()}
                </select>
            </div>
            <button>Add Book</button>
        </form>
    );
}

export default AddBook;
