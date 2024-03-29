import React, { useState } from 'react'
import  './App.css';


const App = () => {
  
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId , seteditId] = useState(0);

  const handlSubmit = (e) =>{
      e.preventDefault();
      
      if(editId){
        const editTodo = todos.find((i)=> i.id === editId);
        
        const updataTodos = todos.map((t)=>
          t.id===editTodo.id
           ? (t = {id:t.id, todo})
           : {id:t.id, todo:t.todo}
        );
      //       const updataTodos = todos.map((item) =>
      //   item.id === editTodo.id ? (item = { id: item.id, todo }) : item
      // )
        setTodos(updataTodos)
        seteditId(0);
        setTodo("");
        return;
      }

      if(todo !== ''){
          setTodos([{id: `${todo}-${Date.now()}`,todo},...todos])
          setTodo("");
      }

  }

 const handleDelete = (id) =>{
   const delTodo = todos.filter((to) => to.id !== id)
   setTodos([...delTodo])
  }

  const handleEdit = (id) =>{
    
    const editTodo = todos.find((find)=> find.id === id)
    setTodo(editTodo.todo)
    seteditId(id)

  }

  return (

    <div className='App'>
        <div className='container'>
           <h1>Todo List App</h1>
           <form className='todoForm' onSubmit={handlSubmit}>
            <input type='text' value={todo} onChange={(e) => setTodo(e.target.value)}/>
            <button type='submit'>{editId ? "Edit" : "Go"}</button>
           </form>

           <ul className='allTodos'>
            {
              todos.map((t)=>(
                <li className='singleTodo'>
                <span className='textTodo' key={t.id}>
                   {t.todo} 
                   </span>

                <button onClick={()=> handleEdit(t.id)}> Edit</button>

                <button onClick={()=>handleDelete(t.id)}>Delete</button>
                </li>
              ))
            }

           </ul>
        </div>
    </div>
  )
}

export default App
