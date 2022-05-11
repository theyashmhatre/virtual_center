import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TagsInput = ({ tags, setTags }) => {
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const value = e.target.value;
    if (value.trim()) setTags([...tags, value.toLowerCase()]);
    e.target.value = "";

    e.preventDefault();
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  return (
    <div className="border-2 rounded-lg flex items-center flex-wrap mt-1 p-2 overflow-x-auto">
      {tags.map((tag, index) => (
        <div
          className="flex items-center space-x-3 bg-gray-100 inline-block rounded-3xl my-4 mr-4 p-2"
          key={index}
        >
          <span>{tag}</span>
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="lg"
            className="cursor-pointer"
            onClick={() => removeTag(index)}
          />
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        className="grow px-2 border-none outline-none"
        placeholder="Type something and Enter"
      />
    </div>
  );
};

export default TagsInput;
