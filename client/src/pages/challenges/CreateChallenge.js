import { EditorState, convertToRaw } from "draft-js";
import { useState } from "react";
import TagsInput from "../../components/Challenges/TagsInput";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RichTextEditor from "../../components/RichTextEditor";
import { createChallenge } from "../../utilities/api/challenge";
import { isEmptyObject } from "../../utilities/utils";
import { createChallengeInputValidation } from "../../utilities/validation/challenge";

const initialInputValues = {
  title: '',
  description: EditorState.createEmpty(),
  coverImage: '',
  tags: [],
  endDate: '',
  privacyCheck: false,
};

const CreateChallenge = () => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    let { name, value, type, files } = e.target;

    setInputValues({
      ...inputValues,
      [name]: type == "file" ? files[0] : value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    const inputErrors = createChallengeInputValidation(inputValues);

    if (isEmptyObject(inputErrors))
      createChallenge({
        ...inputValues,
        description: JSON.stringify(convertToRaw(inputValues.description.getCurrentContent()))
      })
        .then(() => setSuccessMessage("Challenge is created!!"))
        .catch((error) => {
          if (error.response)
            if (error.response.data) setErrors(error.response.data);
            else setErrors({ main: "Some Error Occured, Try Again!" });
          else setErrors({ main: "Some Error Occured, Try Again!" });
        });
    else setErrors(inputErrors);
  };

  return (
    <div>
      <Navbar />
      <div className="my-10 mx-40">
        <h1 className="text-3xl text-center font-bold my-5">
          Create Challenge
        </h1>
        <div className="space-y-5">
          <div>
            <label className="block mb-1 font-bold text-gray-500">Title</label>
            <input
              type="text"
              name="title"
              value={inputValues.title}
              onChange={handleInputChange}
              placeholder="Type the challenge title here"
              className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
            />
            <label htmlFor="agree" className="ml-2 text-gray-400 text-sm">
              A crisp and clear title attracts more readers
            </label>
            {!errors.title ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.title}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Challenge Description
            </label>
            <RichTextEditor
              editorState={inputValues.description}
              setEditorState={(value) => {
                setInputValues({
                  ...inputValues,
                  description: value
                })
              }}
              placeholder="Type challenge description here"
            />
            {/* <label htmlFor="agree" className="ml-2 text-gray-400 text-sm">
              Describe the challenge in max 200 words.
            </label> */}
            {!errors.description ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.description}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              name="coverImage"
              onChange={handleInputChange}
              placeholder="Upload photo for cover image"
              className="border-2 rounded-lg w-full"
            />
            {!errors.coverImage ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.coverImage}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">Tags</label>
            <TagsInput
              tags={inputValues.tags}
              setTags={(value) => {
                setInputValues({
                  ...inputValues,
                  tags: value
                })
              }} />
            <label htmlFor="tags" className="ml-2 text-gray-400 text-sm">
              Please use meaningful tags that makes it easy for others to
              discover your content.
            </label>
            {!errors.tags ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.tags}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">
              End Date
            </label>
            <input
              type="Date"
              name="endDate"
              value={inputValues.endDate}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
            />
            {!errors.endDate ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.endDate}</p>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                name="privacyCheck"
                value={inputValues.privacyCheck}
                onChange={() => setInputValues({
                  ...inputValues,
                  privacyCheck: !inputValues.privacyCheck
                })}
              />
              <label htmlFor="agree" className="ml-2 text-gray-700 text-sm">
                I agree to the terms and privacy of TCS.
              </label>
            </div>
            {!errors.privacyCheck ? null : (
              <div className="text-red-700 text-lg mb-5">
                <p>{errors.privacyCheck}</p>
              </div>
            )}
          </div>
          {!errors.main ? null : (
            <div className="text-center text-red-700 text-lg mb-5">
              <p>{errors.main}</p>
            </div>
          )}
          {!successMessage ? null : (
            <div className="text-center text-green-700 text-lg mb-5">
              <p>{successMessage}</p>
            </div>
          )}
          <div className="text-center pt-6">
            <button
              className="py-3 px-14 rounded-full bg-black-btn text-white font-bold"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateChallenge;
