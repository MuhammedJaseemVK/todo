import './App.css';
import { useState, useEffect } from 'react';
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
    localStorage.setItem('todos', JSON.stringify(newList));
    setToDoList(newList);
    setInputTodo('');
  }

  const handleKeyDown = (event) =>{
    if(event.key==='Enter'){
      handleAdd();
    }
  }

  const handleDelete = (index) => {
    const newList = toDoList.filter((toDo, i) => {
      return index !== i
    });
    localStorage.setItem('todos', JSON.stringify(newList));
    setToDoList(newList);
  }

  const handleStatus = (index) => {
    const newList = toDoList.map((toDo, i) => {
      if (i === index) {
        return { ...toDo, status: !toDo.status }
      }
      return toDo;
    });
    localStorage.setItem('todos', JSON.stringify(newList));
    setToDoList(newList);
  }

  useEffect(() => {
    if (localStorage.getItem('todos')) {
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
    <div className='flex justify-center items-center w-screen h-screen text-white bg-slate-900'>
      <div className="flex flex-col bg-slate-800 gap-3 p-5 rounded-md text-center h-1/2">
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold'>ToDo App</h1>
          <div className="flex flex-row">
            <input type="text" className='rounded-l-md bg-slate-500 px-3' name="todo" value={inputTodo} onChange={handleOnChange} onKeyDown={handleKeyDown} />
            <button className='rounded-r-md bg-yellow-500 px-3 py-1' name="addButoon" onClick={handleAdd} >Add</button>
          </div>
        </div>
        <div className='flex flex-col rounded-md bg-slate-500 p-3 gap-2 h-full overflow-auto'>
          {toDoList.length > 0 ? (<>
            {doneToDos} done {activeToDos} to go
            {
              toDoList.map((toDoElement, index) => {
                return <Todo key={index} todoItem={toDoElement} handleDelete={() => handleDelete(index)} handleStatus={() => handleStatus(index)} />
              })
            }
          </>
          )
            : <div className='flex flex-col justify-center items-center h-full'>
              <img className="w-20" src="lemonade-chill.jpg" alt="" />
              <p className='font-bold'>Just chill</p>
            </div>}
        </div>
      </div>

    </div>
  );
}

export default App;
