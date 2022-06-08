import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { format } from 'timeago.js'

const NotesList = () => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = async () => {
        const res = await axios.get('http://localhost:3000/api/notes')
        setNotes([...res.data])
    }

    const deleteNote = async (id) => {
        await axios.delete('http://localhost:3000/api/notes/' + id);
        getNotes();
    }

    return (
        <>
            <div className="row">
                {
                    notes.map(note => (

                        <div className="col-md-4 p-2" key={note._id} >
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    <Link
                                        to={"/edit/" + note._id}
                                        className='btn btn-success'
                                    >
                                        Edit
                                    </Link>
                                </div>

                                <div className="card-body">
                                    <p> {note.content} </p>
                                    <p> {note.author} </p>
                                    <p> {format(note.date)} </p>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => deleteNote(note._id)}
                                    >Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default NotesList