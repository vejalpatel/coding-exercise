import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Ticket = () => {
  const [tickets, setTicket] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    const result = await axios.get("http://localhost:3003/tickets");
    setTicket(result.data.reverse());
  };

  const deleteTicket = async id => {
    await axios.delete(`http://localhost:3003/tickets/${id}`);
    loadTickets();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div style={{ textAlign: "right" }} >
          <Link className="btn btn-outline-dark" to="/tickets/add">Add Ticket</Link>
        </div>
        <br></br>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{ticket.name}</td>
                <td>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/tickets/edit/${ticket.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteTicket(ticket.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ticket;
