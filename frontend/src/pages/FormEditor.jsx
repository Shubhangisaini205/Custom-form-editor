import React, { useState } from 'react';
import Header from '../components/Header';
import CategorizeQuestion from '../components/CategorizeQuestion';
import ClozeQuestion from '../components/ClozeQuestion';
import Comprehension from '../components/Comprehension';

const FormEditor = () => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = (type) => {
    setQuestions([...questions, { type, points: 10 }]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionTypeChange = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    setQuestions(updatedQuestions);
  };

  const handlePointsChange = (index, points) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].points = points;
    setQuestions(updatedQuestions);
  };

  return (
    <div className='w-[800px] m-auto mb-20 border-2 p-5 pb-10'>

      <h2 className='text-2xl font-semibold mb-4'> Custom Form Editor</h2>
      <Header />

      {questions.map((question, index) => (
        <div key={index} className='border-2 p-4 rounded mb-4'>
          <div className='flex justify-between '>
            {/* Question Number */}
            <div>
              <label className='block mb-2 text-gray-700 font-bold text-left'>Question {index + 1}:</label>
            </div>

            {/* Question Type */}
            <div>
              <label className='mr-5 block mb-2 text-gray-700 font-bold text-left'>Question Type:</label>
              <select
                value={question.type}
                onChange={(e) => handleQuestionTypeChange(index, e.target.value)}
                className='w-[150px] block rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              >
                <option value='Categorize'>Categorize</option>
                <option value='Cloze'>Cloze</option>
                <option value='Comprehension'>Comprehension</option>
              </select>
            </div>

            {/* Points */}
            <div>
              <label className='block mb-2 text-gray-700 font-bold text-left'>Points:</label>
              <input
                type='number'
                value={question.points}
                onChange={(e) => handlePointsChange(index, e.target.value)}
                className='block w-[100px] rounded-md border-gray-300 py-2 px-3 mb-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>

            {/* Delete Question */}
            <button
              onClick={() => removeQuestion(index)}
              className=' text-red-500 font-semibold'
            >
              Delete Question
            </button>
          </div>

          {question.type === 'Categorize' && (
            <CategorizeQuestion />
          )}

          {question.type === 'Cloze' && (
            <ClozeQuestion />
          )}

          {question.type === 'Comprehension' && (
            <Comprehension />
          )}
        </div>
      ))}

      <div className='mb-4 text-left'>
        <label className='text-lg font-semibold mr-6'>Add a Question:</label>
        <select
          onChange={(e) => addQuestion(e.target.value)}
          className='mt-2 w-[200px] block rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        >
          <option value='Categorize'>Categorize</option>
          <option value='Cloze'>Cloze</option>
          <option value='Comprehension'>Comprehension</option>
        </select>
      </div>
    </div>
  );
};

export default FormEditor;
