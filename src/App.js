import './App.css';
import { useState, useEffect } from 'react';
import Todo from './components/Todo';
import Modal from './components/Modal';
import About from './components/About';


function App() {
  const [inputTodo, setInputTodo] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const [activeToDos, setActiveToDos] = useState(0);
  const [doneToDos, setDoneToDos] = useState(0);
  const [isConfirm, setIsConfirm] = useState(false);

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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
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

  const handleEdit = (index, newText) => {
    const updatedList = [...toDoList];
    updatedList[index].task = newText;
    localStorage.setItem('todos', JSON.stringify(updatedList));
    setToDoList(updatedList);
  };

  const handleDeleteAll = () => {
    handleIsConfirm();
    const updatedList = [];
    localStorage.setItem('todos', updatedList);
    setToDoList(updatedList)
  }
  const handleIsConfirm = () => {
    setIsConfirm(!isConfirm);
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
    <div className='flex justify-center items-center w-screen h-screen text-white bg-slate-900 font-poppins'>
      <div className="flex flex-col bg-slate-800 gap-3 p-5 rounded-md text-center h-1/2 mx-5 md:mx-0 ">
        <div className='flex flex-col gap-2 items-center'>
          <div className="flex justify-center items-center gap-2">
            <img className='w-10' src="logo512.png" alt="Logo" />
            <h1 className='font-bold'>ToDo App</h1>
          </div>
          <div className="flex flex-row">
            <input type="text" className='rounded-l-md bg-slate-500 px-3 w-full ' name="todo" value={inputTodo} onChange={handleOnChange} onKeyDown={handleKeyDown} />
            <button className='rounded-r-md bg-red-500 px-3 py-1 ' name="addButoon" onClick={handleAdd} >Add</button>
          </div>
        </div>
        <div className='flex flex-col rounded-md  bg-slate-500 p-3 gap-2 h-full overflow-auto'>
          {toDoList.length > 0 ? (<>
          {doneToDos===toDoList.length?(<p>Your work is done!</p>):(<p>{doneToDos} done {activeToDos} to go</p>)}
          
            {
              toDoList.map((toDoElement, index) => {
                return <Todo key={index} todoItem={toDoElement} handleDelete={() => handleDelete(index)} handleStatus={() => handleStatus(index)} handleEdit={(newText) => handleEdit(index, newText)} />
              })
            }

          </>
          )
            : <div className='flex flex-col justify-center items-center h-full'>
              <About />
            </div>}
        </div>
        {
          toDoList.length > 0 ? (<div className="flex justify-center">
            <button className='bg-red-500 rounded-md px-2' onClick={handleIsConfirm}>Delete All</button>
          </div>) : (null)
        }
        {
          isConfirm ? (<Modal handleIsConfirm={handleIsConfirm} handleDeleteAll={handleDeleteAll} />) : (null)
        }
      </div>

    </div>
  );
}

export default App;
