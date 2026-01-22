"use client";
import React from "react";

type BoardProps = {
  board: {
    columns: {
      id: number;
      name: string;
      cards: {
        id: number;
        title: string;
        priority: "low" | "medium" | "high";
        description?: string;
        dueDate?: string;
        labels?: string[];
      }[];
    }[];
  };
  onAddCard: (columnId: number) => void;
  onDeleteCard: (columnId: number, cardId: number) => void;
  onMoveCard: (
    fromColumnId: number,
    toColumnId: number,
    cardId: number,
  ) => void;
};

export default function Board({
  board,
  onAddCard,
  onDeleteCard,
  onMoveCard,
}: BoardProps) {
  return (
    <div className="board-container" id="boardContainer">
      {board.columns.map((column) => (
        <div key={column.id} className="column" data-column-id={column.id}>
          <div className="column-header">
            <div style={{ flex: 1 }}>
              <div className="column-title">{column.name}</div>
            </div>
            <div className="column-count">{column.cards.length}</div>
            <div className="column-actions">
              <button>✏️</button>
              <button>🗑️</button>
            </div>
          </div>

          <div
            className="cards-container"
            data-column-id={column.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const raw = e.dataTransfer.getData("text/plain");
              if (!raw) return;

              const data = JSON.parse(raw) as {
                fromColumnId: number;
                cardId: number;
              };
              onMoveCard(data.fromColumnId, column.id, data.cardId);
            }}
          >
            {column.cards.map((card) => (
              <div
                key={card.id}
                className="card"
                draggable
                data-card-id={card.id}
                data-column-id={column.id}
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    "text/plain",
                    JSON.stringify({
                      fromColumnId: column.id,
                      cardId: card.id,
                    }),
                  );
                }}
              >
                <div className="card-header">
                  <div className="card-title">{card.title}</div>
                  <span className={`card-priority priority-${card.priority}`}>
                    {card.priority.toUpperCase()}
                  </span>
                </div>

                {card.description && (
                  <div className="card-description">{card.description}</div>
                )}

                <div className="card-footer">
                  {card.dueDate && (
                    <div className="card-due">{card.dueDate}</div>
                  )}

                  {card.labels && card.labels.length > 0 && (
                    <div className="card-labels">
                      {card.labels.map((label, i) => (
                        <span key={i} className="label">
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  <button
                    onClick={() => {
                      if (confirm("Delete this card?"))
                        onDeleteCard(column.id, card.id);
                    }}
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            ))}

            <button
              className="add-card-btn"
              onClick={() => onAddCard(column.id)}
            >
              + Add Task
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
