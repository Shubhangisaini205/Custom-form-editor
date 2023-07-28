// FormPreview.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shuffleArray } from '../utils/utils';

const FormPreview = () => {
  const { formId } = useParams()
  const [data, setData] = useState({})
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [answer, setAnswer] = useState([])
  const [response, setResponse] = useState([])
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/forms/${formId}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res)
      })
  }, [])

  const handleSubmit = () => {

    if(!email||!email){
      alert("Enter you name and email id.");
      return;
    }
    let obj = {name,email,formId,response}
    
    console.log(obj)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/response/add`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj)
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Response submitted successfully")
      })
      .catch((err) => console.log(err))
  };


  const replaceWordsWithUnderscores = (paragraph, options) => {
    return paragraph.split(' ').map((word, index) => {
      const isUnderlined = options?.includes(word);
      return isUnderlined ? (
        <span key={index}>
          {Array.from({ length: word.length }, (_, i) => (
            <span key={i}>&#95;</span>
          ))}
        </span>
      ) : (
        <span key={index}>{word} </span>
      );
    });
  };
  const handleAnswerSave = (index, data) => {
    const updatedResponse = [...response];
    updatedResponse[index] = { ...updatedResponse[index] = data };
    setResponse(updatedResponse)
  }

  return (
    <div className='w-[800px] m-auto mb-20 text-left mt-20'>
      <div className=' flex border-2 p-5 mb-10 justify-around'>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Name:</h1>
        <input
          type="text"
          placeholder={`Enter you name`}
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
        />
         </div>
        <div>
        <h1 className='text-2xl font-bold mb-4'>Email:</h1>
        <input
          type="text"
          placeholder={`Enter you Email`}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
        />
         </div>
      </div>


      {Object.keys(data).length !== 0 ?
        (
          <div>
            <div className='border-2 p-5 mb-10'>
              <h1 className='text-2xl font-semibold mb-4'>{data.header.heading}</h1>
              <p className='text-gray-600'>{data.header.description}</p>
              <h1 className='text-sm italic mt-2'>Note:(Click the save button after filling the answer of each Question)</h1>
            </div>

            {/* Questions */}
            {data?.questions.map((question, index) => (
              <div key={index + question} className='border-2 p-4 rounded mb-4'>
                {/* Display question based on its type */}
                <h1 className='text-xl font-semibold mb-4'>Question No: {index + 1}</h1>
                {question.type === 'Categorize' && (
                  <div >
                    <h1 className='text-xl font-semibold'>{question.data.questionTitle}</h1>
                    <h4 className='font-bold'>Categories we have: {question.data.categories.map((cat, i) => (
                      <p key={i} className='mb-1'>{i + 1} - {cat}</p>
                    ))}</h4>
                    <div>
                      {question.data.items.map((el, i) =>
                      (
                        <div key={i} className='flex items-center mb-2'>

                          <p>{el.name}</p>
                          <select
                            onChange={(e) => setAnswer([...answer, e.target.value])}
                            className=" ml-6 flex w-[170px] rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >

                            <option value="">Select Category</option>
                            {question.data.categories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>

                        </div>
                      )

                      )}
                    </div>
                    <button
                      onClick={() => handleAnswerSave(index, { questionNo: index + 1, answer: answer })}
                      className='bg-blue-600 mt-5 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >Save Answer</button>

                  </div>
                )}

                {question.type === 'Cloze' && (
                  <div>
                    <h1 className='text-2xl font-semibold mb-4'> Fill in the blanks. Write correct answer </h1>

                    {/* <h1>{replaceWordsWithUnderscores(question.data.paragraph, question.data.options)}</h1> */}
                    <div className='flex flex-wrap gap-2'>
                      {replaceWordsWithUnderscores(question.data.paragraph, question.data.options)}
                    </div>
                    <h1 className='mt-4'>Options:</h1>
                    <div className='flex gap-2 mt-2'>
                      {shuffleArray(question.data.options)}
                    </div>
                    <div className='flex gap-5 mt-4 '>
                      <input
                        onChange={(e) => setAnswer(e.target.value)}
                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                        type='text'
                        placeholder={`Enter the answer`}
                      />
                    </div>
                    <h1 className='text-sm italic mt-2'>(Enter the answers in correct sequence separated by commas)</h1>
                    <button
                      onClick={() => handleAnswerSave(index, { questionNo: index + 1, answer: answer })}
                      className='bg-blue-600 mt-5 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >Save Answer</button>
                  </div>
                )}

                {question.type === 'Comprehension' && (
                  <div>
                    <h1 className='text-2xl font-bold mb-4'>{question.data.instructions} </h1>
                    <h1 className='text-xl font-semibold mb-4'>{question.data.passage} </h1>
                    {question.data.subQuestions.map((el, i) => (
                      <div key={i}>
                        {el.type == "MCQ" ?
                          (<>
                            <h1 className='text-xl font-semibold mb-2'>{el.type}</h1>
                            <h1>{el.question}</h1>
                            <div>
                              {el.options.map((item, j) => (
                                <div key={j} className='flex items-center mb-2'>
                                  <input
                                    onChange={(e) => setAnswer(item)}
                                    type='radio' name={`MCQ_${index}_${i}`}
                                    className='form-radio h-4 w-4 text-green-600'
                                  />
                                  <label className='ml-2'>{item}</label>
                                </div>
                              ))}
                            </div>
                          </>)
                          :
                          (<>
                            <h1 className='text-xl font-semibold mb-2'>{el.type}</h1>
                            <h1>{el.question}</h1>
                            <h1 className='text-sm italic'> Min Chars {el.minChars}</h1>
                            <h1 className='text-sm italic'> Max Chars {el.maxChars}</h1>
                            <label className='block mt-2'>Answer:</label>
                            <input
                              onChange={(e) => setAnswer(e.target.value)}
                              className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
                              type="text" placeholder='Enter your answer' />
                          </>)}
                      </div>
                    ))}

                    <button
                      onClick={() => handleAnswerSave(index, { questionNo: index + 1, answer: answer })}
                      className='bg-blue-600 mt-5 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >Save Answer</button>

                  </div>
                )}
              </div>
            ))}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className='bg-green-600  hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Submit Form
            </button>

          </div>) : ""}
    </div>

  );
};

export default FormPreview;




