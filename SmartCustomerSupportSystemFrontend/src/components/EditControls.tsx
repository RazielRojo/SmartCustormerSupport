import React from 'react';

interface EditControlsProps {
  hasEdits: boolean;
  onSave: () => void;
}

export default function EditControls({ hasEdits, onSave }: EditControlsProps) {
  if (!hasEdits) return null;

  return (
    <div className="mt-4 flex justify-end">
      <button
        onClick={onSave}
        className="manageTicketButton px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Save All Changes
      </button>
    </div>
  );
}