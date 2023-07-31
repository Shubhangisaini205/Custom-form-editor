import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import FormPreview from '../pages/FormPreview';
import FormEditor from '../pages/FormEditor';
import ThankYouPage from '../pages/ThankYouPage';


function AllRoutes() {
    const [formData, setFormData] = useState({});
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-form" element={<FormEditor/>}/>
        <Route path="/preview/:formId" element={<FormPreview/>}/>
        <Route path="/thankyou" element={<ThankYouPage/>}/>
    </Routes>
  )
}

export default AllRoutes