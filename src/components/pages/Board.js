import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Board = () => {
  const [boards, setBoard] = useState([]);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    const result = await axios.get("http://localhost:3003/boards");
    setBoard(result.data.reverse());
  };



  return (
    <div className="container">
      <div className="py-4">
        <div style={{textAlign: "right"}} >
        <Link className="btn btn-outline-dark" to="/boards/add">Add Board</Link>
        </div>
        <br></br>
        <table class="table border shadow" >
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {boards.map((board, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{board.name}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Board;
