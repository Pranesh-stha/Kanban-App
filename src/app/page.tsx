"use client";

import React from "react";
import AddCard from "./components/home/AddCard";
import Board from "./components/home/Board";
import Header from "./components/layout/Header";
import { title } from "process";

export default function Home() {

  const[cardModalOpen, setCardModalOpen] = React.useState<boolean>(false);

  const[newCard, setNewCard] = React.useState({
    title:"",
    description:"",
    priority:"medium",
    dueDate:"",
    labels:""
  });


  return (


    <>
      <Header />
      <Board setCardModalOpen={setCardModalOpen} />
      {cardModalOpen && <AddCard setCardModalOpen={setCardModalOpen} newCard={newCard} setNewCard={setNewCard}/>}

      <div>hello pranesh</div>
    </>
  );
}
