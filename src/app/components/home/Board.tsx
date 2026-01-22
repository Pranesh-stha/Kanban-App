"use client";
import React from "react";

type BoardProps={
  setCardModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Board({ setCardModalOpen }: BoardProps) {
  type Priority = "low" | "medium" | "high";

  interface Card {
    id: number;
    title: string;
    priority: Priority;
    description?: string;
    dueDate?: string;
    labels?: string[];
  }

  interface Column {
    id: number;
    name: string;
    cards: Card[];
  }

  interface Board {
    columns: Column[];
    nextColumnId: number;
    nextCardId: number;
  }

  const [initialBoard, setInitialBoard] = React.useState<Board>({
    columns: [
      {
        id: 1,
        name: "To Do",
        cards: [
          {
            id: 1,
            title: "Design login page",
            priority: "high",
            description: "Create wireframe and final UI",
            dueDate: "2026-01-28",
            labels: ["ui", "design"],
          },
        ],
      },
      {
        id: 2,
        name: "In Progress",
        cards: [
          {
            id: 2,
            title: "Implement auth flow",
            priority: "medium",
            description: "JWT + refresh tokens",
            dueDate: "2026-01-25",
            labels: ["backend", "auth"],
          },
          {
            id: 3,
            title: "Implement pranesh flow",
            priority: "medium",
            description: "JWT + refresh tokens",
            dueDate: "2026-01-25",
            labels: ["backend", "auth"],
          },
        ],
      },
    ],
    nextColumnId: 4,
    nextCardId: 4,
  });

  const board: Board = initialBoard;

  return (
    <div className="board-container" id="boardContainer">
      {board.columns.map((column) => (
        <div key={column.id} className="column" data-column-id={column.id}>
          {/* Column Header */}
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

          {/* Cards */}
          <div className="cards-container" data-column-id={column.id}>
            {column.cards.map((card) => (
              <div
                key={card.id}
                className="card"
                draggable
                data-card-id={card.id}
                data-column-id={column.id}
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
                  <button>Edit</button>
                </div>
              </div>
            ))}

            <button className="add-card-btn" onClick={()=>setCardModalOpen(true)}>+ Add Task</button>
          </div>
        </div>
      ))}
    </div>
  );
}
