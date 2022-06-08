import React, { useState, useEffect } from 'react';
import axios from 'axios'

const CreateUser = () => {

    const [users, setUsers] = useState([])
    const [addUser, setAddUser] = useState("")

    const getUsers = async () => {
        const res = await axios.get('http://localhost:3000/api/users');
        setUsers([...res.data])
    }

    useEffect(() => {
        // (async () => {
        //     const users = await axios.get('http://localhost:3000/api/users');
        //     setUsers([...res.data])
        // }
        // )()
        getUsers()
    }, [])

    const onChange = (e) => {
        setAddUser(e.target.value)
        // console.log("🔥");
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:3000/api/users', {
            user: addUser
        })
        setUsers([...res.data])
        getUsers();
        setAddUser("")
    }

    const deleteUser = async (id) => {
        await axios.delete('http://localhost:3000/api/users/' + id);
        getUsers();
    }

    return (
        <>
            <div className='row'>
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create new user</h3>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className='form-control'
                                    value={addUser}
                                    onChange={onChange}></input>
                            </div>
                            <button type='submit' className='btn btn-info'>
                                Save
                            </button>

                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            // users.length > 0 &&
                            users.map(user => (
                                <li className='list-group-item list-group-item-action'
                                    key={user._id}
                                    onDoubleClick={() => deleteUser(user._id)}
                                >
                                    {user.user}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CreateUser