"use client";

import React from "react";
import AddCard from "./components/home/AddCard";
import Board from "./components/home/Board";
import Header from "./components/layout/Header";
import AddColumn from "./components/home/AddColumn";

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
  const [columnModalOpen, setColumnModalOpen] = React.useState(false);
  const [newColumnName, setNewColumnName] = React.useState("");

  const [targetColumnId, setTargetColumnId] = React.useState<number | null>(
    null,
  );
  const [board, setBoard] = React.useState<BoardState>({
    columns: [
      {
        id: 1,
        name: "To Do",
        cards: [],
      },
      {
        id: 2,
        name: "In Progress",
        cards: [],
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

  function moveCard(fromColumnId: number, toColumnId: number, cardId: number) {
    if (fromColumnId === toColumnId) return;

    setBoard((prev) => {
      let movedCard: Card | null = null;

      const columnsAfterRemove = prev.columns.map((col) => {
        if (col.id !== fromColumnId) return col;

        const remaining = col.cards.filter((c) => {
          if (c.id === cardId) {
            movedCard = c;
            return false;
          }
          return true;
        });

        return { ...col, cards: remaining };
      });

      if (!movedCard) return prev;

      const columnsAfterAdd = columnsAfterRemove.map((col) => {
        if (col.id !== toColumnId) return col;
        return { ...col, cards: [...col.cards, movedCard!] };
      });

      return { ...prev, columns: columnsAfterAdd };
    });
  }

  function handleSaveColumn() {
    if (!newColumnName.trim()) return;

    setBoard((prev) => ({
      ...prev,
      nextColumnId: prev.nextColumnId + 1,
      columns: [
        ...prev.columns,
        {
          id: prev.nextColumnId,
          name: newColumnName.trim(),
          cards: [],
        },
      ],
    }));

    setNewColumnName("");
  }

  function handleDeleteColumn(columnId: number) {
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.filter((c) => c.id !== columnId),
    }));
  }

  function handleRenameColumn(columnId: number, newName: string) {
    const name = newName.trim();
    if (!name) return;

    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((col) =>
        col.id === columnId ? { ...col, name } : col,
      ),
    }));
  }

  return (
    <>
      <Header onAddColumn={() => setColumnModalOpen(true)} />

      <Board
        board={board}
        onAddCard={(columnId) => {
          setTargetColumnId(columnId);
          setCardModalOpen(true);
        }}
        onDeleteCard={handleDeleteCard}
        onMoveCard={moveCard}
        onDeleteColumn={handleDeleteColumn}
        onRenameColumn={handleRenameColumn}
      />

      {cardModalOpen && (
        <AddCard
          setCardModalOpen={setCardModalOpen}
          newCard={newCard}
          setNewCard={setNewCard}
          onSave={handleSaveCard}
        />
      )}

      {columnModalOpen && (
        <AddColumn
          setColumnModalOpen={setColumnModalOpen}
          newColumnName={newColumnName}
          setNewColumnName={setNewColumnName}
          onSave={handleSaveColumn}
        />
      )}

      <div>hello pranesh</div>
    </>
  );
}
