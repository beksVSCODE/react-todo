import React, { useEffect, useState,Fragment } from "react";
import "./App.css"
import axios from "axios"

const API_URL = "http://localhost:3500"


const App = () => {
  const [value,setValue] = useState('')
  const [todos,setTodos] = useState([])
  const [secondValue,setSecondValue] = useState("")
  const [bolean,setBolean] = useState(false)
  const [post,setPost] = useState({})
  useEffect(() => {
    getTodosRequest()
  },[value,secondValue])

  // useEffect(() => {
  //   console.log(todos);
  // },[todos])
  
  async function getTodosRequest () {
    try {
      const {data} = await axios(`${API_URL}/todos`)
      setTodos(data)
    } catch(error){
      console.log(error);
    }
  }


  async function completeTodoRequest (todo){
    try{
      const {data} = await axios.patch(`${API_URL}/todos/${todo.id}`, { isCompleted:!todo.isCompleted})
      setTodos(prevTodos => {
        return prevTodos.map(prevTodo => {
          return prevTodo.id === todo.id ? data : prevTodo
        })
      })
    } catch(error){
      console.log(error);
    }
  }

  async function handleDelete(todoshka){
    await axios.delete(`${API_URL}/todos/${todoshka.id}`)
    setTodos((prevTodos) => {
      prevTodos.filter((todo) => todoshka.id === todo.id)
    })
    setSecondValue((prevSetSecondValue) => prevSetSecondValue + 1)
  }

  
  function hadnleChangeInput(event){
    setValue(event.target.value)
    setPost( {
      title:event.target.value,
      isCompleted:false
    })
  }  
  async function startPut(todoEd){
    setValue(todoEd.title)
    await axios.patch(`${API_URL}/todos/${todoEd.id}`, post)
  }

   function handleEdit (todoEdit,event){
    setValue(todoEdit.title)
     if(event.target.className === "wrapper__delete_green"){
        event.target.textContent = "добавить изменение"
        startPut(todoEdit)
        setBolean(true)
        if(bolean){
            event.target.textContent = "изменить"
            setValue("")
            setBolean(false)
        }

    }
    
    }


  const hadnleClick = () => {
    if(value !== ""){
      axios.post(`${API_URL}/todos`, post)
      setValue("")
    }
  }

  return (
      <div className="wrapper">
         <h1>Todo List Application</h1>
        <div className="wrapper__container container">
            <div className="wrapper__content">
              <input
                value={value}
                onChange={hadnleChangeInput}
               className="wrapper__input" type="text"
              />
              <button
                onClick={hadnleClick}
               className="wrapper__btn">
                click
               </button>
               {/* <button
                onClick={startPut}
               className="wrapper__edit_btn">
                Добавить изменение
               </button> */}
            </div>
          <div>
                {todos?.length ? (
                  <ul>
                    {todos.map(todo => (
                      <li key={todo.id}>
                        <span>{todo.title}</span>
                        <input 
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => completeTodoRequest(todo)}
                        />
                        <button
              
                          onClick={()=> handleDelete(todo)}
                         className="wrapper__delete">
                          удалить
                        </button>
                        <button
              
                          onClick={(event)=> handleEdit(todo,event)}
                         className="wrapper__delete_green">
                          изменить
                        </button>
                      </li>
                    ))}
                  </ul> 
                ) : <React.Fragment />}
          </div>
        </div>
      </div>
  )
}


export default App;
