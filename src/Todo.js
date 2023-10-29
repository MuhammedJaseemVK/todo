import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa'

function Todo(props) {

    return (
        <div className='flex justify-between items-center rounded bg-yellow-500 px-2 py-1  w-full'>
            <input type="checkbox" />
            {props.todoText}
            <FaRegTrashAlt onClick={props.handleDelete} />
        </div>
    )
}

export default Todo