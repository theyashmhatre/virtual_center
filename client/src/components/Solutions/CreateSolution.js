import { EditorState, convertToRaw } from "draft-js";
import { useState } from "react";
import { useParams } from "react-router";
import RichTextEditor from "../RichTextEditor";
import { createSolution } from "../../utilities/api/solution";
import { isEmptyObject } from "../../utilities/utils";
import { createSolutionInputValidation } from "../../utilities/validation/solution";
import TagsInput from "../Challenges/TagsInput";

const initialInputValues = {
  solutionTitle: "",
  solutionDescription: EditorState.createEmpty(),
  teamMembers: [],
  attachment: "",
};

const CreateSolution = () => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const { challengeId } = useParams();

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
    setSuccessMessage("");
    const inputErrors = createSolutionInputValidation(inputValues);

    if (isEmptyObject(inputErrors)) {
      const reader = new FileReader();

      reader.onload = () => {
        createSolution({
          challengeId,
          ...inputValues,
          attachment: reader.result,
          solutionDescription: JSON.stringify(
            convertToRaw(inputValues.solutionDescription.getCurrentContent())
          ),
        })
          .then(() => setSuccessMessage("Solution submitted!!"))
          .catch((error) => {
            if (error.response)
              if (error.response.data) setErrors(error.response.data);
              else setErrors({ main: "Some Error Occured, Try Again!" });
            else setErrors({ main: "Some Error Occured, Try Again!" });
          });
      };

      reader.onerror = () => setErrors({
        main: "Error while reading image data"
      });
      
      reader.readAsDataURL(inputValues.attachment);
    } else setErrors(inputErrors);
  };

  return (
    <div className="w-full border-2">
      <div className="flex items-center flex-col">
        <div className="my-10 mx-40">
          <h1 className="text-3xl text-center font-bold my-5">
            Create Solution
          </h1>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="block mb-1 font-bold text-gray-500"
              >
                Title
              </label>
              <input
                type="text"
                name="solutionTitle"
                value={inputValues.solutionTitle}
                onChange={handleInputChange}
                placeholder="Type solution title here"
                className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
              />
              <label htmlFor="agree" className="ml-2 text-gray-400 text-sm">
                A crisp and clear title attracts more readers
              </label>
              {!errors.solutionTitle ? null : (
                <div className="text-center text-red-700 text-lg mb-5">
                  <p>{errors.solutionTitle}</p>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="Description"
                className="block mb-1 font-bold text-gray-500"
              >
                Solution Description
              </label>
              <RichTextEditor
                editorState={inputValues.solutionDescription}
                setEditorState={(value) => {
                  setInputValues({
                    ...inputValues,
                    solutionDescription: value,
                  });
                }}
                placeholder="Type solution description here"
              />
              {!errors.solutionDescription ? null : (
                <div className="text-center text-red-700 text-lg mb-5">
                  <p>{errors.solutionDescription}</p>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="Attachment"
                className="block mb-1 font-bold text-gray-500"
              >
                Attachment
              </label>
              <input
                type="file"
                accept=".doc, .docx, .ppt, .pptx, .pdf"
                name="attachment"
                onChange={handleInputChange}
                placeholder="Upload attachment"
                className="border-2 rounded-lg w-full"
              />
              {!errors.attachment ? null : (
                <div className="text-center text-red-700 text-lg mb-5">
                  <p>{errors.attachment}</p>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor="Tags"
                className="block mb-1 font-bold text-gray-500"
              >
                Team Members
              </label>
              <TagsInput
                tags={inputValues.teamMembers}
                setTags={(value) => {
                  setInputValues({
                    ...inputValues,
                    teamMembers: value,
                  });
                }}
              />
              <label htmlFor="tags" className="ml-2 text-gray-400 text-sm">
                Enter Employee Id of your Team Members if any.
              </label>
              {!errors.teamMembers ? null : (
                <div className="text-center text-red-700 text-lg mb-5">
                  <p>{errors.teamMembers}</p>
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
      </div>
    </div>
  );
};

export default CreateSolution;
