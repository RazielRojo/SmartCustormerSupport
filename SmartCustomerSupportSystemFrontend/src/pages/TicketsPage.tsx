import React from 'react';
import AddTicketModal from "./AddTicketModal";
import "./ticketsPageStyle.css"
import { useTickets } from '../hooks/useTickets';
import FilterBar from '../components/FilterBar';
import TicketTable from '../components/TicketTable';
import EditControls from '../components/EditControls';

export default function TicketsTable() {
  const {
    tickets,
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
  } = useTickets();

  return (
    <div className="mx-auto p-4">
      <FilterBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchText={searchText}
        setSearchText={setSearchText}
        onAddClick={() => setIsModalOpen(true)}
      />
      <TicketTable
        tickets={tickets}
        editedTickets={editedTickets}
        setEditedTickets={setEditedTickets}
      />
      <EditControls
        hasEdits={Object.keys(editedTickets).length > 0}
        onSave={saveChanges}
      />
      <AddTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTicket}
      />
    </div>
  );
}

