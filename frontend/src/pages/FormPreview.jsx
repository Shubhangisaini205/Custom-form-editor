// FormPreview.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FormPreview = () => {
  const { formId } = useParams()
  const [data, setData] = useState({})
  useEffect(() => {
    fetch(`http://localhost:8080/forms/${formId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res)
      })
  }, [])

  // State to store user responses for each question
  const [responses, setResponses] = useState([]);

  const handleResponseChange = (index, response) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = response;
    setResponses(updatedResponses);
  };

  const handleSubmit = () => {
    // Submit the responses to the backend (You can implement the backend API call here)
    console.log('Responses:', responses);
  };
  var shuffledOptions = ""
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.map((el) => (<button className='border-2 mr-10'>{el}</button>));
  }

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

  // Assuming question.data.options is the array of options you want to shuffle

  return (
    <div className='w-[800px] m-auto mb-20'>

      {Object.keys(data).length !== 0 ?
        (
          <div>
            <div className='border-2 p-5 mb-10'>
              <h1 className='text-2xl font-semibold mb-4'>{data.header.heading}</h1>
              <p className='text-gray-600'>{data.header.description}</p>
            </div>

            {/* Questions */}
            {data?.questions.map((question, index) => (
              <div key={index + question} className='border-2 p-4 rounded mb-4'>
                {/* Display question based on its type */}
                {question.type === 'Categorize' && (
                  <div >
                    <h1>{question.data.questionTitle}</h1>
                    <h4>Categories we have: {question.data.categories.map((cat, i) => (
                      <p>{i + 1} - {cat}</p>
                    ))}</h4>
                    <div>
                      {question.data.items.map((el) =>
                      (
                        <div className='flex'>
                          <p>
                            {el.name}
                          </p>
                          <input type='text' placeholder='Enter your Answer' />
                        </div>
                      )

                      )}
                    </div>

                  </div>

                )}

                {question.type === 'Cloze' && (
                  <div>
                    <h1 className='text-2xl font-semibold mb-4'> Fill in the blanks. Write correct answer </h1>

                    {/* <h1>{replaceWordsWithUnderscores(question.data.paragraph, question.data.options)}</h1> */}

                    <h1>{replaceWordsWithUnderscores(question.data.paragraph, question.data.options)}</h1>
                    <h1>Options:</h1>
                    <div>
                      {shuffleArray(question.data.options)}
                    </div>
                    <div className='flex gap-5 mt-10'>
                      {question.data.options.map((el, i) => (
                        <input type='text' placeholder={`Enter the ${i + 1} blank here`} />
                      ))}
                    </div>
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
                            <h1>{el.type}</h1>
                            <h1>{el.question}</h1>
                            <p className='font-bold'>Options</p>
                            {el.options.map((item) => (
                              <div>
                                <input type='radio' name="MCQ"
                                /> <lable>{item}</lable>
                              </div>

                            ))}

                          </>)
                          :
                          (<>
                            <h1>{el.type}</h1>
                            <h1>{el.question}</h1>
                            <h1> Min Chars {el.minChars}</h1>
                            <h1> Max Chars {el.maxChars}</h1>
                            <label>Answer:</label>
                            <input type="text" placeholder='Enter your answer' />
                          </>)}
                      </div>
                    ))}

                  </div>
                )}

                {/* Input field for user response */}
                <div className='mt-4'>
                  <label className='block mb-2 text-gray-700 font-bold text-left'>
                    Your Response:
                  </label>
                  <input
                    type='text'
                    value={responses[index]}
                    onChange={(e) => handleResponseChange(index, e.target.value)}
                    className='block w-full rounded-md border-gray-300 py-2 px-3 mb-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className='bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Submit
            </button>

          </div>) : ""}
    </div>

  );
};

export default FormPreview;




