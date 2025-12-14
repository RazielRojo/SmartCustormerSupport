import React, { useState } from "react";
import ReactDOM from "react-dom";
import type { SupportTicketDTO } from '../types';
interface AddTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticket: SupportTicketDTO) => void;
}
import "./AddTicket.css"


const AddTicketModal: React.FC<AddTicketModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  //const [status, setStatus] = useState("Open");
  //const [resolution, setResolution] = useState("");
  //const id = "";
  const handleSubmit = () => {
    onSubmit({
      name,
      email,
      description,
    });

    // clear form
    setName("");
    setEmail("");
    setDescription("");
    //setStatus("Open");
    //setResolution("");

    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center h-full w-full z-50  modal">
      <div className="modalForm rounded-lg shadow-xl p-6 w-3/4 max-w-lg">
        
        <h2 className="text-2xl font-bold mb-4">Add Support Ticket</h2>
        {/* Name */}
        <label className="block text-sm font-medium mb-1">Customer Name</label>
        <input
          type="text"
          className="border rounded p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Customer Email</label>
        <input
          type="email"
          className="border rounded p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Description */}
        <label className="block text-sm font-medium mb-1">Issue Description</label>
        <textarea
          rows={3}
          className="border rounded p-2 w-full mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />


        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="buttonOrange px-3 py-2 border rounded hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="buttonOrange px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Add Ticket
          </button>
        </div>
      </div>
    </div>
  ,
    document.body);
};

export default AddTicketModal;
