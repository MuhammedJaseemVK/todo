import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa'

function Todo(props) {

    return (
        <div className={`${props.todoItem.status?'line-through ':''} flex justify-between items-center rounded bg-yellow-500 px-2 py-1  w-full`}>
            <input type="checkbox" checked={props.todoItem.status} name="checkbox" onChange={props.handleStatus} />
            {props.todoItem.task}
            <FaRegTrashAlt onClick={props.handleDelete} />
        </div>
    )
}

export default Todo