import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';


function AllRoutes() {
    const [formData, setFormData] = useState({});
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
    </Routes>
  )
}

export default AllRoutes