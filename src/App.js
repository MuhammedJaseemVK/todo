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
    if (!inputTodo) {
      return
    }
    setToDoList([...toDoList, inputTodo]);
    setInputTodo('');
  }

  const handleDelete = (index) => {
    let newList = toDoList.filter((toDo, i) => {
      return index !== i
    });
    setToDoList(newList);
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen text-white bg-slate-900'>
      <div className="flex flex-col bg-slate-800 gap-3 p-2 rounded-md text-center ">
        <div>
          <h1>ToDo App</h1>
          <input type="text" className='rounded-md bg-slate-500 px-1' value={inputTodo} onChange={handleOnChange} />
          <button className='rounded-md bg-yellow-500 px-1' onClick={handleAdd} >Add</button>
        </div>
        {toDoList.length > 0 ? (<div className='flex flex-col rounded-md bg-slate-500 p-3 gap-2'>
          {
            toDoList.map((toDoElement, index) => {
              return <Todo key={index} todoText={toDoElement} handleDelete={() => handleDelete(index)} />
            })
          }
        </div>)
          :null}
      </div>

    </div>
  );
}

export default App;
