import { useEffect, useState } from 'react'
import './App.css'
import { v4 } from "uuid"
import { HiOutlineTrash } from "react-icons/hi"


const getAllTodosData = () => {
  let data = localStorage.getItem('todosChallengeByAyush')

  if (data) {
    return JSON.parse(data)
  } else {
    return []
  }

}

function App() {

  const [showTodos, setShowTodos] = useState('all')

  const [todosArray, setTodosArray] = useState(getAllTodosData()) //combined todos



  const [todoInput, setTodoInput] = useState('')

  const [currentTodo, setCurrentTodo] = useState({});


  // add todo
  const addTodo = () => {

    if (todoInput !== '') {
      setTodosArray((prevTodos) => {
        return [
          ...prevTodos, {
            id: v4(),
            todoText: todoInput,
            isCompleted: false
          }
        ]
      })

      setTodoInput('')
    } else {
      alert("Todo can't be empty")
    }

  }

  // mark todo as completed (edit)
  const markTodoCompleted = (todo) => {

    setCurrentTodo({ ...todo, isCompleted: true })

    setTodosArray(todosArray.map((todoItem) => {
      if (todoItem?.id === currentTodo?.id) {
        return currentTodo
      } else {
        return todoItem
      }
    }))


  }

  // delete todo
  const deleteTodo = (id) => {
    setTodosArray(todosArray.map((todo) => {
      if (todo?.id !== id) {
        return todo

      }
    }))
  }

  // delete all the completed todos
  const deleteAllCompletedTodos = () => {
    setTodosArray(todosArray.map((todo) => {
      if (todo?.isCompleted === false) {
        return todo
      }
    }))
  }


  useEffect(() => {
    localStorage.setItem('todosChallengeByAyush', JSON.stringify(todosArray))
  }, [todosArray])


  return (
    <div className="app">

      <h1>#todo</h1>

      <div className="app_nav">
        <h2 onClick={() => setShowTodos('all')} style={{
          borderBottomColor: showTodos === "all" && "#2F80ED", marginBottom: showTodos === "all" && "-2px"
        }} >All</h2>
        <h2 onClick={() => setShowTodos('active')} style={{
          borderBottomColor: showTodos === "active" && "#2F80ED", marginBottom: showTodos === "active" && "-2px"
        }} >Active</h2>
        <h2 onClick={() => setShowTodos('completed')} style={{
          borderBottomColor: showTodos === "completed" && "#2F80ED", marginBottom: showTodos === "completed" && "-2px"
        }}  >Completed</h2>
      </div>

      {showTodos !== "completed" && <div className="app_search">
        <input type="text" placeholder='Add details' value={todoInput} onChange={(e) => setTodoInput(e.target.value)} />
        <button onClick={addTodo} >Add</button>
      </div>}


      <div className="app_list">
        {showTodos === "all" && todosArray.length > 0 && todosArray.map((todo) => {
          return todo !== undefined && todo !== null && Object.keys(todo).length !== 0 && <h2 key={todo?.id} style={{ textDecoration: todo?.isCompleted === true && "line-through", textDecorationColor: todo?.isCompleted === true && "#1F1F1F" }} ><input type="checkbox" onClick={() => markTodoCompleted(todo)}
            checked={todo?.isCompleted === true ? true : false} />  <span>{todo?.todoText}</span></h2>
        })}

        {showTodos === "active" && todosArray.length > 0 && todosArray.map((todo) => {
          if (todo?.isCompleted === false) {

            return < h2 key={todo?.id
            } style={{ textDecoration: todo?.isCompleted === true && "line-through", textDecorationColor: todo?.isCompleted === true && "#1F1F1F" }} ><input type="checkbox" onClick={() => markTodoCompleted(todo)}
              checked={todo?.isCompleted === true ? true : false} />  <span>{todo?.todoText}</span></h2>
          }
        })}


        {showTodos === "completed" && todosArray.length > 0 && todosArray.map((todo) => {
          if (todo?.isCompleted === true) {

            return <h2 key={todo?.id} style={{ textDecoration: todo?.isCompleted === true && "line-through", textDecorationColor: todo?.isCompleted === true && "#1F1F1F" }} ><input type="checkbox" onClick={() => markTodoCompleted(todo)}
              checked={todo?.isCompleted === true ? true : false} />  <span>{todo?.todoText}</span>  <img src="https://ik.imagekit.io/ayush2007/delete_qe_UITt3J.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671525533274" onClick={() => deleteTodo(todo?.id)} /></h2>
          }
        })}


      </div>

      {
        showTodos === "completed" &&
        <div className="delete_all"  >
          <button onClick={deleteAllCompletedTodos} ><HiOutlineTrash /> Delete all</button>
        </div>
      }

    </div >
  )
}

export default App
