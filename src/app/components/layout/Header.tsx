type HeaderProps = {
  onAddColumn: () => void;
};


export default function Header({ onAddColumn }: HeaderProps) 
 {
  return (
    <div className="header">
      <h1>📋 Kanban Board</h1>
      <div className="header-controls">
        
        <div className="toolbar">
          
          <button className="btn btn-primary" onClick={() => onAddColumn()}>
            + Add Column
          </button>
        </div>
      </div>
    </div>
  );
}
