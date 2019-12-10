import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/querires'


const AddBook = () => {
    const {loading, error, data} = useQuery(getAuthorsQuery)
    const [name, setName] = useState("")
    const [genre, setGenre] = useState("")
    const [authorId, setAuthorId] = useState("")
    const [addBookMutationFunc, { mutationStatus }] = useMutation(addBookMutation)

    const displayAuthors = () =>{
        if (loading) return <option>Loading Authors...</option>
        
        let authors = data.authors;
        return authors.map(author => (
            <option key={author.id} value={author.id}>
                {author.name}
            </option>
        ))
    }
    
    const submit = (e) =>{
        e.preventDefault();
        let selectedAuthor = authorId
        if ( !error && data && data.authors && selectedAuthor === ""){
            selectedAuthor = data.authors[0]['id']
        }
        let inputObj = {name, genre, authorId: selectedAuthor}
        console.log(inputObj)
        addBookMutationFunc({
            variables: inputObj,
            refetchQueries: [{
                query: getBooksQuery // refresh the fetch books query in bookList
            }]
        })
    }


    if (error) return <p>Error: can't connect</p>

    return (
        <form id="add-book" onSubmit={submit} >
            <div className="field">
                <label>Book Name:</label>
                <input type="text" onChange={e=> setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre: </label>
                <input type="text" onChange={e=> setGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={e => {
                    console.log(e.target.value)
                    setAuthorId(e.target.value)
                }} >
                    {displayAuthors()}
                </select>
            </div>
            <button>Add Book</button>
        </form>
    );
}

export default AddBook;
