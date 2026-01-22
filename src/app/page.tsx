"use client";

import React from "react";
import AddCard from "./components/home/AddCard";
import Board from "./components/home/Board";
import Header from "./components/layout/Header";

type Priority = "low" | "medium" | "high";

type Card = {
  id: number;
  title: string;
  priority: Priority;
  description?: string;
  dueDate?: string;
  labels?: string[];
};

type Column = {
  id: number;
  name: string;
  cards: Card[];
};

type BoardState = {
  columns: Column[];
  nextColumnId: number;
  nextCardId: number;
};

export default function Home() {
  const [cardModalOpen, setCardModalOpen] = React.useState<boolean>(false);
  const [targetColumnId, setTargetColumnId] = React.useState<number | null>(
    null,
  );
  const [board, setBoard] = React.useState<BoardState>({
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
        ],
      },
      { id: 3, name: "Done", cards: [] },
    ],
    nextColumnId: 4,
    nextCardId: 3,
  });

  function handleSaveCard() {
    if (targetColumnId == null) return;

    setBoard((prev) => {
      const labelsArr =
        newCard.labels.trim().length > 0
          ? newCard.labels
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined;

      const createdCard = {
        id: prev.nextCardId,
        title: newCard.title,
        priority: newCard.priority as "low" | "medium" | "high",
        description: newCard.description.trim()
          ? newCard.description
          : undefined,
        dueDate: newCard.dueDate || undefined,
        labels: labelsArr,
      };

      return {
        ...prev,
        nextCardId: prev.nextCardId + 1,
        columns: prev.columns.map((col) =>
          col.id === targetColumnId
            ? { ...col, cards: [...col.cards, createdCard] }
            : col,
        ),
      };
    });

    setNewCard({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      labels: "",
    });

    setTargetColumnId(null);
  }

  const [newCard, setNewCard] = React.useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    labels: "",
  });

  function handleDeleteCard(columnId: number, cardId: number) {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col,
      ),
    }));
  }

  

  return (
    <>
      <Header />
      <Board
        board={board}
        onAddCard={(columnId) => {
          setTargetColumnId(columnId);
          setCardModalOpen(true);
        }}
        onDeleteCard={handleDeleteCard}
      />

      {cardModalOpen && (
        <AddCard
          setCardModalOpen={setCardModalOpen}
          newCard={newCard}
          setNewCard={setNewCard}
          onSave={handleSaveCard}
        />
      )}

      <div>hello pranesh</div>
    </>
  );
}
