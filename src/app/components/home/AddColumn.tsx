export default function AddColumn() {
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
          />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
