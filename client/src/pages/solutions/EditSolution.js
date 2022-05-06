import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { roleIds } from "../../../constants";
import RichTextEditor from "../../components/RichTextEditor";
import MainLayout from "../../layouts/MainLayout";
import {
  editSolution,
  getSingleSolution,
} from "../../utilities/api/solution";
import { isEmptyObject } from "../../utilities/utils";
import {
  createSolutionInputValidation
} from "../../utilities/validation/solution";

const initialInputValues = {
  solutionTitle: "",
  solutionDescription: EditorState.createEmpty(),
  attachment: "",
};

const EditSolution = () => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const { solutionId } = useParams();

  const handleInputChange = (e) => {
    let { name, value, type, files } = e.target;

    if (type === "file") {
      const reader = new FileReader();

      reader.onload = () => {
        setInputValues({
          ...inputValues,
          [name]: reader.result,
        });
      };

      reader.onerror = () => setErrors({
        [name]: "Error while reading file"
      });
      
      reader.readAsDataURL(files[0]);
    } else {
      setInputValues({
        ...inputValues,
        [name]: value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    const inputErrors = createSolutionInputValidation(inputValues);

    if (isEmptyObject(inputErrors)) {
      editSolution({
        solutionId,
        ...inputValues,
        solutionDescription: JSON.stringify(
          convertToRaw(inputValues.solutionDescription.getCurrentContent())
        ),
      })
        .then(() => setSuccessMessage("Solution updated!"))
        .catch((error) => {
          if (error.response)
            if (error.response.data) setErrors(error.response.data);
            else setErrors({ main: "Some Error Occured, Try Again!" });
          else setErrors({ main: "Some Error Occured, Try Again!" });
        });
    } else setErrors(inputErrors);
  };

  useEffect(() => {
    getSingleSolution(solutionId)
      .then(({ data }) => {
        setInputValues((prevInputValues) => {
          return {
            ...prevInputValues,
            solutionTitle: data.title,
            solutionDescription: EditorState.createWithContent(
              convertFromRaw(JSON.parse(data.description))
            ),
          };
        });

        if (data.attachment)
          new Blob(
            [new Uint8Array(data.attachment.data)],
            {type: ".pdf"}
          )
            .text()
            .then((result) => {
              setInputValues((prevInputValues) => {
                return {
                  ...prevInputValues,
                  attachment: result,
                };
              });
            });
      })
      .catch((error) => {
        if (error.response)
          if (error.response.data) setErrors(error.response.data);
          else setErrors({ main: "Some Error Occured, Try Again!" });
        else setErrors({ main: "Some Error Occured, Try Again!" });
      });
  }, []);
  
  return (
    <MainLayout role={roleIds["user"]}>
      <div>
        <div className="flex items-center flex-col">
          <div className="my-10 mx-40">
            <h1 className="text-3xl text-center font-bold my-5">
              Edit Solution
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
    </MainLayout>
  );
};

export default EditSolution;
