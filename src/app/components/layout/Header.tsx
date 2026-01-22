type HeaderProps = {
  onAddColumn: () => void;
};


export default function Header({ onAddColumn }: HeaderProps) 
 {
  return (
    <div className="header">
      <h1>📋 Kanban Board</h1>
      <div className="header-controls">
        <input
          type="text"
          className="search-box"
          id="searchInput"
          placeholder="Search tasks..."
        />
        <div className="toolbar">
          <button className="btn btn-secondary" id="exportBtn">
            📥 Export
          </button>
          <button className="btn btn-secondary" id="importBtn">
            📤 Import
          </button>
          <button className="btn btn-primary" onClick={() => onAddColumn()}>
            + Add Column
          </button>
        </div>
      </div>
    </div>
  );
}
