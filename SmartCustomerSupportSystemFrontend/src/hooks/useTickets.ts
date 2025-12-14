import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from '../config';
import type { SupportTicket, SupportTicketDTO } from '../types';

export function useTickets() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchText, setSearchText] = useState("");
  const [editedTickets, setEditedTickets] = useState<Record<string, { status: string; resolution: string }>>({});

  const fetchTickets = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/SupportTicket/GetAllTickets`);
    setTickets(response.data);
  };

  const handleAddTicket = async (newTicket: SupportTicketDTO) => {
    await fetch(`${API_BASE_URL}/api/SupportTicket/CreateSupportTicket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket)
    });
    setIsModalOpen(false);
    fetchTickets();
  };

  const saveChanges = async () => {
    const updates = Object.entries(editedTickets).map(([id, values]) => ({
      id,
      status: values.status,
      resolution: values.resolution,
    }));
    await axios.post(`${API_BASE_URL}/api/SupportTicket/UpdateSupportTicket`, updates);
    setEditedTickets({});
    fetchTickets();
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = tickets.filter(t => {
    const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
    const search = searchText.toLowerCase();
    const matchesText = t.name.toLowerCase().includes(search) || t.description.toLowerCase().includes(search);
    return matchesStatus && matchesText;
  });

  return {
    tickets: filteredTickets,
    isModalOpen,
    setIsModalOpen,
    statusFilter,
    setStatusFilter,
    searchText,
    setSearchText,
    editedTickets,
    setEditedTickets,
    handleAddTicket,
    saveChanges,
  };
}