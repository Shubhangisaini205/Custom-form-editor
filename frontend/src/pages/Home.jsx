import React from 'react'
import { Link } from 'react-router-dom'


function Home() {
    return (

        <div>
            <Link to="/create-form">
                <div className='ml-10 border-2 p-5 w-60 mt-10 rounded mb-30'>
                    <div className='m-auto'>
                        <img width={"250px"} className='border-2 h-30 ' src="https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png" alt="add form" />
                    </div>
                    <h1 className="text-md font-bold text-left mt-5 text-gray-700"> Blank </h1>
                    <p className='mt-1 text-left font-semibold text-red-700 '>Create a new form</p>
                </div>
            </Link>
        </div>
    )
}

export default Home