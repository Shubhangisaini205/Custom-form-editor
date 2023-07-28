import React, { useState } from 'react';
import Header from '../components/Header';
import CategorizeQuestion from '../components/CategorizeQuestion';
import ClozeQuestion from '../components/ClozeQuestion';
import Comprehension from '../components/Comprehension';
import { Link } from 'react-router-dom';

const FormEditor = () => {
  const [ formId, setFormId] = useState("")
  const [questions, setQuestions] = useState([])
  const [header, setHeader] = useState("")
  // console.log(header)
  const addQuestion = (type) => {
    let initialData;
    if (type === 'Categorize') {
      initialData = { categories: [], items: [{ name: '', category: '' }] };
    } else if (type === 'Cloze') {
      initialData = { paragraph: '', options: [] };
    } else if (type === 'Comprehension') {
      initialData = { instructions: '', passage: '', subQuestions: [] };
    }
    setQuestions([...questions, { type, points: 10, data: initialData }]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionDataChange = (index, data) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], data };
    setQuestions(updatedQuestions);
    // console.log(questions)
  };

  const handlePointsChange = (index, points) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].points = points;
    setQuestions(updatedQuestions);
  };

  let obj = {};
  const handleSaveForm = () => {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    const charactersLength = characters.length;
    let randomId = '';

    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      randomId += characters.charAt(randomIndex);
    }
    setFormId(randomId)

    obj = { formId:randomId, header, questions }
    console.log(obj);

    fetch("http://localhost:8080/forms/add", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj)
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  };

  console.log(formId,"XXXX")
  return (
    <div className='w-[800px] m-auto mb-20 border-2 p-5 pb-10'>
      <h2 className='text-2xl font-semibold mb-4'> Custom Form Editor</h2>
      <Header setHeader={setHeader} />
      {questions.map((question, index) => (
        <div key={index} className='border-2 p-4 rounded mb-4'>
          <div className='flex justify-between '>
            {/* Question Number */}
            <div>
              <label className='block mb-2 text-gray-700 font-bold text-left'>Question {index + 1}:</label>
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
            <CategorizeQuestion
              questionIndex={index}
              questionData={question}
              updateQuestionData={(index, data) => handleQuestionDataChange(index, data)} />
          )}

          {question.type === 'Cloze' && (
            <ClozeQuestion
              questionIndex={index}
              questionData={question}
              updateQuestionData={(index, data) => handleQuestionDataChange(index, data)} />
          )}

          {question.type === 'Comprehension' && (
            <Comprehension
              questionIndex={index}
              questionData={question}
              updateQuestionData={(index, data) => handleQuestionDataChange(index, data)} />
          )}
        </div>
      ))}

      <div className='mb-4 text-left'>
        <label className='text-lg font-semibold mr-6'>Add a Question:</label>
        <div className='text-center'>
          <button onClick={() => addQuestion('Categorize')} className='text-green-600 font-semibold'>
            + Add Categorize Question
          </button>
          <button onClick={() => addQuestion('Cloze')} className='text-green-600 font-semibold'>
            + Add Cloze Question
          </button>
          <button onClick={() => addQuestion('Comprehension')} className='text-green-600 font-semibold'>
            + Add Comprehension Question
          </button>
        </div>
      </div>
      <button
        onClick={handleSaveForm}
        className='bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
      >
        Save Form
      </button>

      <Link to={`/preview/${formId}`}>
        <button
          className='bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
        >
          Preview/Fill
        </button>
      </Link>


    </div>
  );
};

export default FormEditor;



