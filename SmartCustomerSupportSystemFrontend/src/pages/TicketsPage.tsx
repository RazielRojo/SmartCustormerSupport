import { useEffect, useState } from "react";
import axios from "axios";
import AddTicketModal from "./AddTicketModal";
import "./ticketsPageStyle.css"
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config';
import type { SupportTicket, SupportTicketDTO } from '../types';

export default function TicketsTable() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchText, setSearchText] = useState("");
  //const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [editedTickets, setEditedTickets] = useState<Record<string, { status: string; resolution: string }>>({});
  const navigate = useNavigate();


  const fetchTickets = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/SupportTicket/GetAllTickets`);
    setTickets(response.data);
  };
  const handleAddTicket = async (newTicket: SupportTicketDTO) => {
    await fetch(`${API_BASE_URL}/api/SupportTicket/CreateSupportTicket`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTicket)
    });

    setIsModalOpen(false);
    fetchTickets();
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(t => {
    const matchesStatus =
      statusFilter === "ALL" || t.status === statusFilter;

    const search = searchText.toLowerCase();
    const matchesText =
      t.name.toLowerCase().includes(search) ||
      t.description.toLowerCase().includes(search);

    return matchesStatus && matchesText;
  });

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
      {/*w-64*/}

      <div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="ALL">All</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border filterText px-3 py-1 rounded w-80"
      />


      <button
        onClick={() => setIsModalOpen(true)}
        className="manageTicketButton bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add
      </button>
    </div>

      <table className="w-full text-left bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100">
            {/* <th className="p-2">ID</th> */}
            <th className="p-2 separationLine">Customer</th>
            <th className="p-2 separationLine">Issue</th>
            {/* <th className="p-2">AI Summary</th> */}
            <th className="p-2 separationLine">Status</th>
            <th className="p-2 separationLine">Resolution</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((t) => (
            <tr key={t.id} className="border-t"  style={{ cursor: 'pointer' }}>
              <td className="p-2" onClick={() => navigate(`/tickets/${t.id}`, { state: { ticket: t } })}>{t.name}</td>
              <td className="p-2" onClick={() => navigate(`/tickets/${t.id}`, { state: { ticket: t } })}>{t.description}</td>
              {/**This is not ideal but I want an option to both view and edit tickets */}
              <td className="p-2"  >
                {editedTickets[t.id] ? (
                <select
                  value={editedTickets[t.id].status}
                  onChange={(e) =>
                    setEditedTickets(prev => ({
                      ...prev,
                      [t.id]: {
                        ...prev[t.id],
                        status: e.target.value,
                      },
                    }))
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              ) : (
                                <div
                  onClick={() =>
                    setEditedTickets(prev => ({
                      ...prev,
                      [t.id]: { status: t.status, resolution: t.resolution ?? "" },
                    }))
                  }
                  style={{ cursor: "pointer" }}
                >
                  {t.status}
                </div>
              )}</td>
              <td className="p-2" 
               >  {editedTickets[t.id] ? (
                <textarea
                  value={editedTickets[t.id].resolution}
                  onChange={(e) =>
                    setEditedTickets(prev => ({
                      ...prev,
                      [t.id]: {
                        ...prev[t.id],
                        resolution: e.target.value,
                      },
                    }))
                  }
                  className="border w-full px-2 py-1 rounded"
                  rows={2}
                />
              ) : (
                <div
                  onClick={() =>
                    setEditedTickets(prev => ({
                      ...prev,
                      [t.id]: { status: t.status, resolution: t.resolution ?? "" },
                    }))
                  }
                  style={{ cursor: "pointer" }}
                >
                  {t.resolution}
                </div>
              )}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {Object.keys(editedTickets).length > 0 && (
      <div className="mt-4 flex justify-end">
        <button
          onClick={async () => {
            const updates = Object.entries(editedTickets).map(
              ([id, values]) => ({
                id,
                status: values.status,
                resolution: values.resolution,
              })
            );

            await axios.post(
              `${API_BASE_URL}/api/SupportTicket/UpdateSupportTicket`,
              updates
            );

            setEditedTickets({});
            fetchTickets();
          }}
          className="manageTicketButton px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Save All Changes
        </button>
      </div>
      )}
      <AddTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTicket}
      />
    </div>
  );
 }

