import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CreateNote = () => {
    const params = useParams();
    console.log(params.id);
    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    const [addNote, setAddNote] = useState({
        title: "",
        content: "",
        author: "",
        date: new Date()
    })
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await axios.get('http://localhost:3000/api/users/');
            setUsers([...res.data])

            if (params.id) {
                const res = await axios.get('http://localhost:3000/api/notes/' + params.id);
                setEdit(true)
                setAddNote({
                    title: res.data.title,
                    content: res.data.content,
                    author: res.data.author,
                    date: new Date(res.data.date)
                })
            }
        })()
    }, [])



    const onSubmit = async (e) => {
        if (setEdit (true)) {
            await axios.put('http://localhost:3000/api/notes/' + params.id, addNote)
        }
        else {
            try {
                e.preventDefault();
                await axios.post('http://localhost:3000/api/notes' , addNote);

            } catch (error) {
                console.log(error);
            }
            navigate('/')
        }
        
    }

    const onInputChange = (e) => {
        setAddNote({ ...addNote, author: e.target.value })
    }

    const onTitleChange = (e) => {
        setAddNote({ ...addNote, title: e.target.value })
    }

    const onContentChange = (e) => {
        setAddNote({ ...addNote, content: e.target.value })
    }

    const onDateChange = (date) => {
        setAddNote({ ...addNote, date })

    }

    return (
        <>
            <div className="col-md offset-md-3">
                <div className="card card-body">
                    <h4>Create Note</h4>

                    {/* Select user */}

                    <div className="form-group">
                        <select
                            className='form-select'
                            name="userSelected"
                            onChange={onInputChange}
                        >
                            {
                                users.map(user => (
                                    <option
                                        key={user._id}
                                    >
                                        {user.user}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Title'
                            name="title"
                            value={addNote.title}
                            required
                            onChange={onTitleChange}
                        >
                        </input>
                    </div>

                    <div className="form-group">
                        <textarea
                            name="content"
                            className='form-control'
                            placeholder="Content"
                            value={addNote.content}
                            required
                            onChange={onContentChange}
                        >

                        </textarea>
                    </div>

                    <div className="form-group">
                        <DatePicker
                            className='form-control'
                            selected={addNote.date}
                            onChange={onDateChange}
                        />
                    </div>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <button
                            type='submit'
                            className='btn btn-info'
                        >
                            Save
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateNote