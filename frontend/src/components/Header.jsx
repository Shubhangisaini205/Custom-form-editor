import React from 'react';

const Header = ({setHeader}) => {
  const [imageURL, setImageURL] = React.useState('');
  const [heading, setHeading] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageURL(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const saveHeader = ()=>{
    setHeader({heading,description})
  }

  return (
    <header className="mb-5 border-2 p-5">
      <div className="flex items-center gap-x-4 mb-4">
        {/* Circular Image Input */}
        <label htmlFor="imageInput" className="cursor-pointer">
          <div className="w-16 h-16 overflow-hidden rounded-full border border-gray-300">
            <img
              src={imageURL || 'path-to-default-image'} // Replace 'path-to-default-image' with your default image path
              alt="Brand Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            id="imageInput"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        {/* Heading and Description Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter Heading (Title)"
            value={heading}
            onChange={handleHeadingChange}
            className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
          />
          <textarea
            placeholder="Enter Description (Summary)"
            value={description}
            onChange={handleDescriptionChange}
            rows="3"
            className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
          />
        </div>
      </div>

      {/* Visualization */}
      <div className="border-2 bg-gray-100 rounded p-4 flex items-center">
        {imageURL && (
          <div className="w-16 h-16 mr-4 overflow-hidden rounded-full border border-gray-300">
            <img
              src={imageURL}
              alt="Brand Logo"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          {heading && <h1 className="text-xl font-bold text-gray-800 mb-2">{heading}</h1>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      </div>
      <button onClick={saveHeader}>
        save header
      </button>
    </header>
  );
};

export default Header;
