import React from 'react';
import { useState } from 'react';
import { FaRegTrashAlt, FaEdit, FaRegSave } from 'react-icons/fa'

function Todo(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.todoItem.task)

    const handleEdit = () => {
        setIsEditing(!isEditing);
        props.handleEdit(editedText)
    }
    const handleChange = (event) => {
        setEditedText(event.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleEdit();
        }
    }
    return (
        <div className={`${props.todoItem.status ? 'line-through ' : ''} flex justify-between items-center rounded bg-yellow-500 px-2 py-1  w-full`}>
            <input type="checkbox" checked={props.todoItem.status} name="checkbox" onChange={props.handleStatus} />
            {
                isEditing ? (
                    <input type="text" className='rounded-md bg-slate-500 w-[200px]' value={editedText} onChange={handleChange} onKeyDown={handleKeyDown} name="editTodo" />
                ) : (props.todoItem.task)
            }
            <div className="flex gap-2">
                {
                    isEditing ? (<FaRegSave onClick={handleEdit} />) :
                        (<FaEdit onClick={handleEdit} />)
                }
                <FaRegTrashAlt onClick={props.handleDelete} />
            </div>
        </div>
    )
}

export default Todo