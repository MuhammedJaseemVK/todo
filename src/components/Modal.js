import React from 'react'

function Modal(props) {
    return (
        <div className={`fixed inset-0 flex justify-center items-center bg-black/80`} onClick={props.handleIsConfirm} >
            <div className="flex flex-col bg-slate-800 p-5 gap-1 items-center rounded-md">
                <img className='h-10 w-10' src="caution.png" alt="" />
                <h1 className='font-bold'>Are you sure?</h1>
                <p>This action will delete all Todos</p>
                <div className="flex gap-2 justify-center">
                <button className='rounded-md bg-white px-2 text-black' onClick={props.handleDeleteAll} >Yes</button>
                <button className='rounded-md bg-red-500 px-2' onClick={props.handleIsConfirm}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Modal