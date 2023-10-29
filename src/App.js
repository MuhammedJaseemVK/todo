import './App.css';
import { useState } from 'react';
import Todo from './Todo';


function App() {
  const [inputTodo, setInputTodo] = useState('');
  const [toDoList, setToDoList] = useState([]);

  const handleOnChange = (event) => {
    setInputTodo(event.target.value);
  }

  const handleAdd = () => {
    setToDoList([...toDoList, inputTodo]);
    setInputTodo('');
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen text-white bg-slate-900'>
      <div className="flex flex-col bg-slate-800 gap-3 p-2 rounded-md text-center ">
        <div>
          <h1>ToDo App</h1>
          <input type="text" className='rounded-md bg-slate-500 px-1' value={inputTodo} onChange={handleOnChange} />
          <button className='rounded-md bg-slate-900 px-1' onClick={handleAdd} >Add</button>
        </div>
        <div className='flex flex-col rounded-md bg-slate-500 p-3 gap-2'>
          {
            toDoList.map((toDoElement)=>{
              return <Todo todoText={toDoElement} />
              // console.log(toDoElement)
            })
          }
        </div>
      </div>

    </div>
  );
}

export default App;
