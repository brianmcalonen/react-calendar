import React, { useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from 'uuid';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles/calendar.css';

function App() {
  const LOCAL_STORAGE_KEY = "todoApp.todos"

  const [todos, setTodos] = useState([])
  const [date, setDate] = useState(new Date())
  const todoValueRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    console.log(storedTodos)

    setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (e) => {
    const todo = todoValueRef.current.value

    if (todo === '') return

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: todo, complete: false }]
    })

    todoValueRef.current.value = null
  }

  const handleClearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete)

    setTodos(newTodos)
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos]

    const todo = newTodos.find(todo => todo.id === id)

    todo.complete = !todo.complete

    setTodos(newTodos)
  }

  return (
    <>
      <h1 className="header">React Calendar</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="text-center">
        Selected date: {date.toDateString()}
      </div>

      <br/><br/><br/><br/>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoValueRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Todos</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do!</div>
    </>
  )
}

export default App;
