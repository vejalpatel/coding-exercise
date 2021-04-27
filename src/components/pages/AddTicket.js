import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const AddTicket = () => {
    let history = useHistory();
    const [ticket, setTicket] = useState({
        name: "",
        description: "",
        createAt: Date.now(),
        updateAt: Date.now(),
    });

    const [boards, setBoard] = useState([]);
    useEffect(() => {
        loadBoards();
    }, []);
    const loadBoards = async () => {
        const result = await axios.get("http://localhost:3003/boards");
        setBoard(result.data.reverse());
    };

    const { name, description, createAt, updateAt, boardid } = ticket;
    const onInputChange = e => {
        setTicket({ ...ticket, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("http://localhost:3003/tickets", ticket);
        history.push("/ticket");
    };
    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add A Ticket</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Description"
                            name="description"
                            value={description}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <select className="form-control form-control-lg" placeholder="Select board" onChange={e => onInputChange(e)} name="boardid" value={boardid}>
                            <option value="0">Select Board</option>
                            {boards.map((board, index) => (
                                <option value={board.id} >{board.name}</option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-primary btn-block">Add Ticket</button>
                </form>
            </div>
        </div>
    );
};

export default AddTicket;
