import React from 'react';

const SubQuestion = ({ index, subQuestion, handleSubQuestionChange, addOption, removeOption, removeSubQuestion }) => {
  return (
    <div className="border-2 p-4 rounded mb-4 ">

      <div className="flex justify-between mb-2 ">
        {/* Question Type */}
        <div className='flex gap-[100px] w-[600px] border-2'>
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
              <option value="MCA">MCA</option>
              <option value="Short Text">Short Text</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-semibold text-left">Points: 10</label>
          </div>

        </div>

        {/* Delete Sub-Question */}
        {/* <button
          
          className="flex-none p-1 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          X
        </button> */}
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
      {subQuestion.type === 'MCQ' || subQuestion.type === 'MCA' ? (
        <div>
          <label className="block mb-2 text-gray-700 font-bold text-left">Options:</label>
          {subQuestion.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex justify-between mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleSubQuestionChange(index, 'options', e.target.value)}
                className="flex-1 rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {subQuestion.type === 'MCA' && (
                <button
                  onClick={() => removeOption(index, optionIndex)}
                  className="flex-none p-1 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  X
                </button>
              )}
            </div>
          ))}
          {subQuestion.type !== 'Short Text' && (
            <button
              onClick={() => addOption(index)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Option
            </button>
          )}
        </div>
      ) : null}

      {/* Answer (for MCQ and MCA types) */}
      {subQuestion.type === 'MCQ' || subQuestion.type === 'MCA' ? (
        <div>
          <label className="block mb-2 text-gray-700 font-bold text-left">Answer:</label>
          <input
            type="text"
            value={subQuestion.answer}
            onChange={(e) => handleSubQuestionChange(index, 'answer', e.target.value)}
            className="block w-full rounded-md border-gray-300 py-2 px-3 mb-4 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      ) : null}

      {/* Min and Max Characters (for Short Text type) */}
      {subQuestion.type === 'Short Text' ? (
        <div>
          <label className="block mb-2 text-gray-700 font-bold text-left">Min Characters:</label>
          <input
            type="number"
            value={subQuestion.minChars}
            onChange={(e) => handleSubQuestionChange(index, 'minChars', e.target.value)}
            className="block w-full rounded-md border-gray-300 py-2 px-3 mb-2 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label className="block mb-2 text-gray-700 font-bold text-left">Max Characters:</label>
          <input
            type="number"
            value={subQuestion.maxChars}
            onChange={(e) => handleSubQuestionChange(index, 'maxChars', e.target.value)}
            className="block w-full rounded-md border-gray-300 py-2 px-3 mb-4 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      ) : null}
    </div>
  );
};

export default SubQuestion;
