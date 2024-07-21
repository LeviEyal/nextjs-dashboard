"use server";

interface Student {
  id: string;
  name: string;
}

interface PrivateLesson {
  id: string;
  studentId?: string;
  studentName?: string;
  date: string;
  paid: boolean;
  duration?: number;
  price?: number;
}

interface DB {
  privateLessons: PrivateLesson[];
}

const db: DB = {
  privateLessons: [
    {
      id: "1",
      studentId: "1",
      studentName: "יובל מאיר",
      date: "2024-07-16",
      paid: true,
      price: 100,
    },
    {
      id: "3",
      studentId: "3",
      studentName: "הדר שפירא",
      date: "2024-07-20",
      paid: false,
      price: 200,
    },
    {
      id: "2",
      studentId: "2",
      studentName: "יוחנן הסנדלר",
      date: "2024-07-18",
      paid: false,
      price: 150,
    },
    {
      id: "4",
      studentId: "4",
      studentName: "דוד יחזקאל",
      date: "2024-07-22",
      paid: false,
      price: 180,
    },
    {
      id: "5",
      studentId: "5",
      studentName: "יצחק מעטוף",
      date: "2024-07-24",
      paid: false,
      price: 120,
    },
  ],
};

export const getTodos = async () => {
  const ans = Object.groupBy(db.privateLessons.toSorted((a, b) => a - b), (lesson) => (new Date(lesson.date) >= new Date() ? "future" : "past"));
  return {
    future: ans.future || [],
    past: ans.past || [],
  };
};


export const addLesson = async (privateLesson: PrivateLesson) => {
  db.privateLessons.push(privateLesson);
};

export const toggleTodo = async (id: string) => {
  const todo = db.privateLessons.find((todo) => todo.id === id);
  if (todo) {
    todo.paid = !todo.paid;
  }
};

export const deleteTodo = async (id: string) => {
  db.privateLessons = db.privateLessons.filter((privateLesson) => privateLesson.id !== id);
};

export const getPaymentsData = async () => {
  const total = db.privateLessons.reduce((acc, lesson) => acc + (lesson.paid ? lesson.price : 0), 0);
  const totalThisMonth = db.privateLessons.reduce((acc, lesson) => {
    const date = new Date(lesson.date);
    const now = new Date();
    return (
      acc +
      (lesson.paid && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear() ? lesson.price : 0)
    );
  }, 0);

  const pending = db.privateLessons.reduce((acc, lesson) => acc + (!lesson.paid ? lesson.price : 0), 0);

  return {
    total,
    totalThisMonth,
    pending
  };
};
