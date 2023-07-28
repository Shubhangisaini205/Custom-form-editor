import React, { useState } from 'react';
import SubQuestion from './SubQuestion';

const Comprehension = ({ questionIndex, questionData, updateQuestionData }) => {
  const [instruction, setInstruction] = useState(questionData.data?.instruction || '');
  const [passage, setPassage] = useState(questionData.data?.passage || '');
  const [mediaOption, setMediaOption] = useState('none');
  const [subQuestions, setSubQuestions] = useState(questionData.data?.subQuestions || []);
  const [imageURL, setImageURL] = useState('');

  const handleImageChange = (e) => {
    // Update the state with the selected image URL
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageURL(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
 

  const addSubQuestion = () => {
    setSubQuestions([...subQuestions, { type: 'MCQ', question: '', options: [''], answer: '' }]);
  };

  const removeSubQuestion = (index) => {
    const updatedSubQuestions = subQuestions.filter((_, i) => i !== index);
    setSubQuestions(updatedSubQuestions);
  };

  const handleSubQuestionChange = (index, field, value, optionIndex) => {
    const updatedSubQuestions = [...subQuestions];
    if (field === 'options') {
      updatedSubQuestions[index][field][optionIndex] = value;
    } else {
      updatedSubQuestions[index][field] = value;
    }
    setSubQuestions(updatedSubQuestions);
   
  };


  const addOption = (index) => {
    const updatedSubQuestions = [...subQuestions];
    updatedSubQuestions[index].options.push('');
    setSubQuestions(updatedSubQuestions);
  };

  const removeOption = (subIndex, optionIndex) => {
    const updatedSubQuestions = [...subQuestions];
    updatedSubQuestions[subIndex].options.splice(optionIndex, 1);
    setSubQuestions(updatedSubQuestions);
  };

  const handleSaveQestion = ()=>{
    // updateQuestionData(questionIndex, {categories,items} )
    updateQuestionData(questionIndex,  {subQuestions, instructions:instruction,passage:passage});
  }

  return (
    <div className="border-2 p-4 rounded mb-4">
      {/* Overall Instruction */}
      <label className="block mb-2 text-gray-700 font-bold text-left">Overall Instruction:</label>
      <input
        type="text"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        className="block w-full rounded-md border-gray-300 py-2 px-3 mb-4 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />

      {/* Passage */}
      <label className="block mb-2 text-gray-700 font-bold text-left">Deatailed question:</label>
      <textarea
        value={passage}
        onChange={(e) => setPassage(e.target.value)}
        className="block w-full rounded-md border-gray-300 py-2 px-3 mb-4 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />

      {/* Media Option */}
      <div className='flex'>
        <label className=" mr-5 block mb-2 text-gray-700 font-bold text-left ">Media Option:</label>
        <select
          value={mediaOption}
          onChange={(e) => setMediaOption(e.target.value)}
          className="w-[100px] block w-full rounded-md border-gray-300 py-2 px-3 mb-4 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="none">None</option>
          <option value="image">Image</option>
        </select>
      </div>

      {/* Conditional rendering for image upload input */}
      {mediaOption === 'image' && (
        <div className="mb-4 text-left">
          <label htmlFor="headerImage" className="text-lg font-semibold mr-6">
            Upload Question Image (Optional):
          </label>
          <input
            id="headerImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2"
          />
        </div>
      )}


      {/* Sub-questions */}
      <div>
        {subQuestions.map((subQuestion, index) => (
          <SubQuestion
            key={index}
            index={index}
            subQuestion={subQuestion}
            handleSubQuestionChange={handleSubQuestionChange}
            addOption={addOption}
            removeOption={removeOption}
            removeSubQuestion={removeSubQuestion}
          />
        ))}
      </div>

      {/* Add Sub-Question */}
      <button
        onClick={addSubQuestion}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Sub-Question
      </button>

      <button onClick={handleSaveQestion}>
        Save question
      </button>
    </div>
  );
};

export default Comprehension;
