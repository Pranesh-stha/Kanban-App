export default function Header(){
  return(
    <div className="header">
        <h1>📋 Kanban Board</h1>
        <div className="header-controls">
            <input type="text" className="search-box" id="searchInput" placeholder="Search tasks..."/>
            <div className="toolbar">
                <button className="btn btn-secondary" id="undoBtn">↩️ Undo</button>
                <button className="btn btn-secondary" id="exportBtn">📥 Export</button>
                <button className="btn btn-secondary" id="importBtn">📤 Import</button>
                <button className="btn btn-primary" id="addColumnBtn">+ Add Column</button>
            </div>
        </div>
    </div>
  )
}