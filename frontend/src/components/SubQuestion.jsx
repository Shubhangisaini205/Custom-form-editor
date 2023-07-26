import React from 'react';

const SubQuestion = ({ index, subQuestion, handleSubQuestionChange, addOption, removeOption, removeSubQuestion }) => {
  return (
    <div className="border-2 p-4 rounded mb-4 ">
      <div className="flex justify-between mb-2 ">
        {/* Question Type */}
        <div className='flex gap-[100px] w-[600px]'>
          <div>
            <label className="block mb-2 text-gray-700 font-bold text-left">Question:{index + 1}</label>
          </div>

          <div className="flex mr-2">
            <label className="mr-5 block mb-1 text-gray-700 font-bold text-left">Question Type:</label>
            <select
              value={subQuestion.type}
              onChange={(e) => handleSubQuestionChange(index, 'type', e.target.value)}
              className=" w-[100px] block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="MCQ">MCQ</option>
              <option value="Short Text">Short Text</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-semibold text-left">Points: 10</label>
          </div>

        </div>

        {/* Delete Sub-Question */}
        <button
          type="button"
          onClick={() => removeSubQuestion(index)}
        >
          ❌
        </button>
      </div>

      {/* Question */}
      <label className="block mb-2 text-gray-700 font-bold text-left">Write Question:</label>
      <input
        type="text"
        value={subQuestion.question}
        onChange={(e) => handleSubQuestionChange(index, 'question', e.target.value)}
        className="block w-full rounded-md border-gray-300 py-2 px-3 mb-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />

      {/* Options (for MCQ and MCA types) */}
      {subQuestion.type === 'MCQ'? (
        <div>
          <label className="block mb-2 text-gray-700 font-bold text-left">Options:</label>
          {subQuestion.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center mb-2">
             
                <input
                  type="radio"
                  name={`option${index}`}
                  value={option}
                  checked={subQuestion.answer === option}
                  onChange={(e) => handleSubQuestionChange(index, 'options', e.target.value)}
                  className="mr-2 text-indigo-500 focus:ring-indigo-500"
                />
              <input
                type="text"
                value={option}
                onChange={(e) => handleSubQuestionChange(index, 'options', e.target.value, optionIndex)}
                className="w-[100px]flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {subQuestion.options.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeOption(index, optionIndex)}
                  className="ml-2 text-red-600 hover:text-red-800 focus:outline-none"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addOption(index)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Option
          </button>
        </div>
      ) : null}

      {/* Answer (for MCQ and MCA types) */}
      {subQuestion.type === 'MCQ'? (
        <div>
          <label className="block mb-2 text-gray-700 font-bold text-left">Select Correct Answer:</label>
          {subQuestion.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center">
               <input
                  type="radio"
                  name={`answer${index}`}
                  value={option}
                  checked={subQuestion.answer === option}
                  onChange={(e) => handleSubQuestionChange(index, 'answer', e.target.value)}
                  className="mr-2 text-indigo-500 focus:ring-indigo-500"
                />
            
              <label>{option}</label>
            </div>
          ))}
        </div>
      ) : null}

      {/* Min and Max Characters (for Short Text type) */}
      {subQuestion.type === 'Short Text' ? (
        <div>
          <label className="block mb-2 text-gray-700 font-bold text-left">Min Words:</label>
          <input
            type="number"
            min={1}
            value={subQuestion.minWords}
            onChange={(e) => handleSubQuestionChange(index, 'minChars', e.target.value)}
            className="block w-[100px] rounded-md border-gray-300 py-2 px-3 mb-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label className="block mb-2 text-gray-700 font-bold text-left">Max Words:</label>
          <input
            type="number"
            min={1}
            value={subQuestion.maxWords}
            onChange={(e) => handleSubQuestionChange(index, 'maxChars', e.target.value)}
            className="block w-[100px] rounded-md border-gray-300 py-2 px-3 mb-4 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      ) : null}
    </div>
  );
};

export default SubQuestion;