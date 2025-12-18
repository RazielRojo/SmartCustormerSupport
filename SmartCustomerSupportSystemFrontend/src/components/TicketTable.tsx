import React from 'react';
import { useNavigate } from "react-router-dom";
import type { SupportTicket } from '../types';
import { STATUS_OPTIONS } from '../constants';

interface TicketTableProps {
  tickets: SupportTicket[];
  editedTickets: Record<string, { status: string; resolution: string }>;
  setEditedTickets: React.Dispatch<React.SetStateAction<Record<string, { status: string; resolution: string }>>>;
}

export default function TicketTable({ tickets, editedTickets, setEditedTickets }: TicketTableProps) {
  const navigate = useNavigate();

  return (
    <table className="w-full text-left bg-white shadow-md rounded">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 separationLine">Customer</th>
          <th className="p-2 separationLine">Issue</th>
          <th className="p-2 separationLine">Status</th>
          <th className="p-2 separationLine">Resolution</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={t.id} className="border-t" style={{ cursor: 'pointer' }}>
            <td className="p-2" onClick={() => navigate(`/tickets/${t.id}`, { state: { ticket: t } })}>{t.name}</td>
            <td className="p-2" onClick={() => navigate(`/tickets/${t.id}`, { state: { ticket: t } })}>{t.description}</td>
            <td className="p-2">
              {editedTickets[t.id] ? (
                <select
                  value={editedTickets[t.id].status}
                  onChange={(e) =>
                    setEditedTickets(prev => ({
                      ...prev,
                      [t.id]: { ...prev[t.id], status: e.target.value },
                    }))
                  }
                  className="border px-2 py-1 rounded"
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
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
              )}
            </td>
            <td className="p-2">
              {editedTickets[t.id] ? (
                <textarea
                  value={editedTickets[t.id].resolution}
                  onChange={(e) =>
                    setEditedTickets(prev => ({
                      ...prev,
                      [t.id]: { ...prev[t.id], resolution: e.target.value },
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
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}