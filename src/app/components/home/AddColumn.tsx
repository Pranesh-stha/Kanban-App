type AddColumnProps = {
  setColumnModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newColumnName: string;
  setNewColumnName: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
};

export default function AddColumn({
  setColumnModalOpen,
  newColumnName,
  setNewColumnName,
  onSave,
}: AddColumnProps) {
  return (
    <div className="modal" id="columnModal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="columnModalTitle">Add Column</h2>
        </div>
        <div className="form-group">
          <label>Column Name</label>
          <input
            type="text"
            id="columnName"
            placeholder="e.g., To Do, In Progress, Done"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setColumnModalOpen(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={() => {
              onSave();
              setColumnModalOpen(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
