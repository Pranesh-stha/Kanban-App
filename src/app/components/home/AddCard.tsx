type CardProps = {
  setCardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newCard?: {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    labels: string;
  };
  setNewCard: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      priority: string;
      dueDate: string;
      labels: string;
    }>
  >;
};

export default function AddCard({
  setCardModalOpen,
  newCard,
  setNewCard,
}: CardProps) {
  function handleInputChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { id, value } = event.target;

    const raw = id.replace("card", "");
    const key = raw[0].toLowerCase() + raw.slice(1);

    setNewCard((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSave() {
    console.log("Saving card:", newCard);
    setCardModalOpen(false);
  }

  return (
    <div className="modal" id="cardModal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="cardModalTitle">Add Task</h2>
        </div>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            id="cardTitle"
            placeholder="e.g., Fix login bug"
            value={newCard?.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            id="cardDescription"
            placeholder="Add task details..."
            value={newCard?.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            id="cardPriority"
            value={newCard?.priority}
            onChange={handleInputChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            id="cardDueDate"
            value={newCard?.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Labels (comma-separated)</label>
          <input
            type="text"
            id="cardLabels"
            placeholder="e.g., Bug, Feature, Urgent"
            value={newCard?.labels}
            onChange={handleInputChange}
          />
        </div>
        <div className="modal-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setCardModalOpen(false)}
          >
            Cancel
          </button>
          <button className="btn btn-danger btn-small" id="deleteCardBtn">
            Delete
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
