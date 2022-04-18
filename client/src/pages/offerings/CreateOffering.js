import { EditorState, convertToRaw } from "draft-js";
import { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import RichTextEditor from "../../components/RichTextEditor";
import { createOffering } from "../../utilities/api/offering";
import { isEmptyObject } from "../../utilities/utils";
import { createOfferingInputValidation } from "../../utilities/validation/offering";

const initialInputValues = {
  title: '',
  description: EditorState.createEmpty(),
  ownerName: '',
  ownerEmail: '',
  attachement: '',
  privacyCheck: false,
};

const CreateOffering = () => {
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
    const inputErrors = createOfferingInputValidation(inputValues);

    if (isEmptyObject(inputErrors))
      createOffering({
        ...inputValues,
        description: JSON.stringify(convertToRaw(inputValues.description.getCurrentContent()))
      })
        .then(() => setSuccessMessage("Offering is created!!"))
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
          Create Offering
        </h1>
        <div className="space-y-5">
          <div>
            <label className="block mb-1 font-bold text-gray-500">Title</label>
            <input
              type="text"
              name="title"
              value={inputValues.title}
              onChange={handleInputChange}
              placeholder="Type the offering title here"
              className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
            />
            {!errors.title ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.title}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Offering Description
            </label>
            <RichTextEditor
              editorState={inputValues.description}
              setEditorState={(value) => {
                setInputValues({
                  ...inputValues,
                  description: value
                })
              }}
              placeholder="Type offering description here"
            />
            {!errors.description ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.description}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={inputValues.ownerName}
              onChange={handleInputChange}
              placeholder="Type owner name"
              className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
            />
            {!errors.ownerName ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.ownerName}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">Owner Email</label>
            <input
              type="email"
              name="ownerEmail"
              value={inputValues.ownerEmail}
              onChange={handleInputChange}
              placeholder="Type owner email"
              className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
            />
            {!errors.ownerEmail ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.ownerEmail}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">Attachement</label>
            <input
              type="file"
              accept=".pdf"
              name="attachement"
              onChange={handleInputChange}
              placeholder="Upload attachement in pdf format"
              className="border-2 rounded-lg w-full"
            />
            {!errors.attachement ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.attachement}</p>
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

export default CreateOffering;
