import React from 'react'
import Header from '../components/Header'
import CategorizeQuestion from '../components/CategorizeQuestion'
import ClozeQuestion from '../components/ClozeQuestion'
import Comprehension from '../components/Comprehension'

function FormEditor() {
  return (
    <div className='w-[800px] m-auto'>
        <Header/>
        <CategorizeQuestion/>
        <ClozeQuestion/>
        <Comprehension/>
    </div>
  )
}

export default FormEditor