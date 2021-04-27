import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditTicket = () => {
  let history = useHistory();
  const { id } = useParams();
  const [ticket, setTicket] = useState({
    name: "",
    description: "",
    // createAt: "",
    updateAt: Date.now(),
    boardid: "",
  });

  const [boards, setBoard] = useState([]);
  useEffect(() => {
    loadBoards();
  }, []);
  const loadBoards = async () => {
    const result = await axios.get("http://localhost:3003/boards");
    setBoard(result.data.reverse());
  };

  const { name, description, updateAt, boardid } = ticket;
  const onInputChange = e => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadTicket();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3003/tickets/${id}`, ticket);
    history.push("/ticket");
  };

  const loadTicket = async () => {
    const result = await axios.get(`http://localhost:3003/tickets/${id}`);
    setTicket(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A Ticket</h2>
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
          <button className="btn btn-warning btn-block">Update Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default EditTicket;
