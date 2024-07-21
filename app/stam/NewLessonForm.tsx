"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addLesson } from "./actions";

export const NewLessonForm = () => {
  const queryClient = useQueryClient();
  const [studentName, setStudentName] = useState("");
  const [date, setDate] = useState("");
  const [paid, setPaid] = useState(false);
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(0);
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");

  // const addLesson = async () => {
  //     if (!studentName || !date) {
  //     setError("Please fill out all fields");
  //     return;
  //     }

  //     addLessonMutation.mutate({
  //     studentName,
  //     date,
  //     paid,
  //     duration,
  //     price,
  //     studentId,
  //     });

  //     setStudentName("");
  //     setDate("");
  //     setPaid(false);
  //     setDuration(30);
  //     setPrice(0);
  //     setStudentId("");
  // };

  const addLessonMutation = useMutation({
    mutationFn: addLesson,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", "paymentsData"] });
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <h1>New Lesson</h1>
      <div className="flex gap-2">
        <label>Student Name</label>
        <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <label>Paid</label>
        <input type="checkbox" checked={paid} onChange={(e) => setPaid(e.target.checked)} />
      </div>
      <div className="flex gap-2">
        <label>Duration</label>
        <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
      </div>
      <div className="flex gap-2">
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <div className="flex gap-2">
        <label>Student ID</label>
        <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
      </div>
      <button
        onClick={() =>
          addLessonMutation.mutate({
            studentName,
            date,
            paid,
            duration,
            price,
            studentId,
            id: Math.random().toString(),
          })
        }
      >
        Add Lesson
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};
