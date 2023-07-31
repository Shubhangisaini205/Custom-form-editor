import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import FormPreview from '../pages/FormPreview';
import FormEditor from '../pages/FormEditor';


function AllRoutes() {
    const [formData, setFormData] = useState({});
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-form" element={<FormEditor/>}/>
        <Route path="/preview/:formId" element={<FormPreview/>}/>
    </Routes>
  )
}

export default AllRoutes