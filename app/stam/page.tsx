"use client";

import { getTodos, deleteTodo, toggleTodo, getPaymentsData } from "./actions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NewLessonForm } from "./NewLessonForm";

export const LessonCard = ({ lesson }) => {
  const queryClient = useQueryClient(); 

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", "paymentsData"] });
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", "paymentsData"] });
    },
  });

  return (
    <div key={lesson.id} className="flex justify-around gap-3 border rounded shadow bg-white m-2 p-5">
      <p>{lesson.studentName}</p>
      <p>{lesson.date}</p>
      <button
        onClick={() => {
          deleteTodoMutation.mutate(lesson.id);
        }}
      >
        Delete
      </button>
      <input
        type="checkbox"
        checked={lesson.paid}
        onChange={() => {
          toggleTodoMutation.mutate(lesson.id, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["todos", "paymentsData"] });
            },
          });
        }}
      />
    </div>
  );
};

export default function Page() {
  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => await getTodos(),
  });

  const pastLessons = todos.past;
  const futureLessons = todos.future;

  const paymentsDataQuery = useQuery({
    queryKey: ["paymentsData"],
    queryFn: async () => await getPaymentsData(),
  });

  if (isLoading || paymentsDataQuery.isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (paymentsDataQuery.isError) return <div>Error: {paymentsDataQuery.error.message}</div>;

  return (
    <div className="h-full w-full bg-slate-200 relative flex flex-col justify-center">
      <NewLessonForm />

      <h1>שיעורים עתידיים</h1>
      <div className="flex flex-col gap-2">
        {futureLessons.map((lesson) => (
          <LessonCard lesson={lesson} />
        ))}
      </div>

      <h1>שיעורים שעברו</h1>
      <div className="flex flex-col gap-2">
        {pastLessons.map((lesson) => (
          <LessonCard lesson={lesson} />
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-slate-500">
        <h1>Payments Data</h1>
        <div className="flex justify-between gap-2">
          <p>{paymentsDataQuery.data?.pending}</p>
          <p>{paymentsDataQuery.data?.totalThisMonth}</p>
          <p>{paymentsDataQuery.data?.total}</p>
        </div>
      </div>
    </div>
  );
}
