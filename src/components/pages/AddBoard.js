import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddBoard = () => {
  let history = useHistory();
  const [board, setBoard] = useState({
    name: "",
    createAt: Date.now(),
    updateAt: Date.now(),
  });

  const { name, createAt, updateAt } = board;
  const onInputChange = e => {
    setBoard({ ...board, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:3003/boards", board);
    history.push("/");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Board</h2>
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
          <button className="btn btn-primary btn-block">Add Board</button>
        </form>
      </div>
    </div>
  );
};

export default AddBoard;
