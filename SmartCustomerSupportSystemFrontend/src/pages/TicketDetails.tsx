import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ticketsPageStyle.css"
import axios from "axios";
import { API_BASE_URL } from '../config';

export default function TicketDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(location.state?.ticket ?? null);

  useEffect(() => {
    // Fallback: direct URL access / refresh
    if (!ticket) {
      axios
        .get(`${API_BASE_URL}/api/SupportTicket/GetTicketById?Id=${id}`)
        .then(res => setTicket(res.data));
    }
  }, [id, ticket]);

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
      <p><b>Id:</b> {ticket.id}</p>
      <p><b>Name:</b> {ticket.name}</p>
      <p><b>Email:</b> {ticket.email}</p>
      <p><b>Status:</b> {ticket.status}</p>

      <div className="mt-4">
        <b>Description:</b>
        <p>{ticket.description}</p>
      </div>

      <button
        onClick={() => navigate('/')}
        className="manageTicketButton mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Tickets
      </button>
    </div>
  );
}
