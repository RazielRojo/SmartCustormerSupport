import React from 'react';
import { STATUS_OPTIONS } from '../types';

interface FilterBarProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  searchText: string;
  setSearchText: (value: string) => void;
  onAddClick: () => void;
}

export default function FilterBar({ statusFilter, setStatusFilter, searchText, setSearchText, onAddClick }: FilterBarProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border px-2 py-1 rounded statusSelect"
      >
        <option value="ALL">All</option>
        {STATUS_OPTIONS.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border filterText px-3 py-1 rounded w-80"
      />
      <button
        onClick={onAddClick}
        className="manageTicketButton bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add
      </button>
    </div>
  );
}