const TagsInput = ({ tags, setTags }) => {
  const handleKeyDown = (e) => {
    if(e.key !== 'Enter') return;
    
    const value = e.target.value;
    if(value.trim())
      setTags([...tags, value]);
      e.target.value = '';
    
    e.preventDefault();
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  return (
    <div className="border-2 rounded-lg flex items-center flex-wrap space-x-5 mt-1 p-2">
      {tags.map((tag, index) => (
        <div className="flex items-center bg-gray-100 inline-block rounded-3xl my-4 p-2" key={index}>
          <span>{tag}</span>
          <span
            className="flex justify-center items-center bg-gray-900 text-white cursor-pointer rounded-full h-6 w-6 ml-4"
            onClick={() => removeTag(index)}
          >
            &times;
          </span>
        </div>
      ))}
      <input onKeyDown={handleKeyDown} type="text" className="grow px-2 border-none outline-none" placeholder="Type something and enter to create a tag" />
    </div>
  );
};

export default TagsInput;
