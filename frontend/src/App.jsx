// src/App.jsx
import React from 'react';

function App() {
  return (
    <>
      <div className='flex items-center justify-center'>
        <h3 className='text-4xl font-bold text-blue-500'>Login</h3>
      </div>
      {/* <div className= "flex items-center justify-center">
        <input className='w-1/6 p-2 text-center m-2' type="text" placeholder='Please enter your username'/>
        <input className='w-1/6 p-2 text-center m-2' type="text" placeholder='Please enter your Password'/>
      </div> */}
      <div className="flex flex-col items-center justify-center">
        <input className='w-1/6 p-2 text-center m-2 shadow-sm border-customBlue rounded' type="text" placeholder='Please enter your username'/>
        <input className='w-1/6 p-2 text-center m-2 shadow-sm rounded' type="password" placeholder='Please enter your password'/>
      </div>
    </>
  )
}

export default App;