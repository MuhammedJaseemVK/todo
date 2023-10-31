import './App.css';
import { useState,useEffect } from 'react';
import Todo from './Todo';


function App() {
  const [inputTodo, setInputTodo] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const [activeToDos, setActiveToDos] = useState(0);
  const [doneToDos, setDoneToDos] = useState(0);

  const handleOnChange = (event) => {
    setInputTodo(event.target.value);
  }

  const handleAdd = () => {
    if (!inputTodo) {
      return
    }
    const newList = [...toDoList, { task: inputTodo, status: false }];
    localStorage.setItem('todos',JSON.stringify(newList));
    setToDoList(newList);
    setInputTodo('');
  }

  const handleDelete = (index) => {
    const newList = toDoList.filter((toDo, i) => {
      return index !== i
    });
    localStorage.setItem('todos',JSON.stringify(newList));
    setToDoList(newList);
  }

  const handleStatus = (index) => {
    const newList = toDoList.map((toDo, i) => {
      if (i === index) {
        return { ...toDo, status: !toDo.status }
      }
      return toDo;
    });
    localStorage.setItem('todos',JSON.stringify(newList));
    setToDoList(newList);
  }

  useEffect(() => {
    if(localStorage.getItem('todos')){
      setToDoList(JSON.parse(localStorage.getItem('todos')))
    }
  }, [])

  useEffect(() => {
    const completeToDos = toDoList.filter((toDoElement) => {
      return toDoElement.status === true;
    });

    const notCompleteToDos = toDoList.filter((toDoElement) => {
      return toDoElement.status === false;
    });

    setDoneToDos(completeToDos.length);
    setActiveToDos(notCompleteToDos.length);
  }, [toDoList])
  




  return (
    <div className='flex flex-col justify-center items-center h-screen text-white bg-slate-900'>
      <div className="flex flex-col bg-slate-800 gap-3 p-2 rounded-md text-center ">
        <div>
          <h1>ToDo App</h1>
          <input type="text" className='rounded-md bg-slate-500 px-1' value={inputTodo} onChange={handleOnChange} />
          <button className='rounded-md bg-yellow-500 px-1' onClick={handleAdd} >Add</button>
        </div>
        {toDoList.length > 0 ? (<div className='flex flex-col rounded-md bg-slate-500 p-3 gap-2'>
          {doneToDos} done {activeToDos} to go
          {
            toDoList.map((toDoElement, index) => {
              return <Todo key={index} todoItem={toDoElement} handleDelete={() => handleDelete(index)} handleStatus={() => handleStatus(index)} />
            })
          }
        </div>)
          : null}
      </div>

    </div>
  );
}

export default App;
