import React from 'react'

function About() {
    return (
        <div className='flex flex-col items-center font-poppins'>
            <img className='w-10' src="logo512.png" alt="Logo" />
            <h1 className='font-bold'>ToDo App</h1>
            <div className='text-center'>
                <p>🔴 Create and manage your tasks</p>
                <p>🔴 Monitor your workload</p>
                <p>🔴 Can install as WebApp</p>
                <p>🔴 Data stays on your device</p>
            </div>
        </div>
    )
}

export default About