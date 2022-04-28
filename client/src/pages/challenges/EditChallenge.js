import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import TagsInput from "../../components/Challenges/TagsInput";
import RichTextEditor from "../../components/RichTextEditor";
import AdminLayout from "../../layouts/AdminLayout";
import { editChallenge, getSingleChallenge } from "../../utilities/api/challenge";
import { isEmptyObject } from "../../utilities/utils";
import { editChallengeInputValidation } from "../../utilities/validation/challenge";

const initialInputValues = {
  title: "",
  description: EditorState.createEmpty(),
  cloudProvider: "",
  tags: [],
  endDate: "",
  privacyCheck: false,
};

const EditChallenge = () => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const { challengeId } = useParams();

  useEffect(() => {
    if (challengeId)
      getSingleChallenge(challengeId)
        .then(({ data }) => {
          console.log(data.end_date);
          const endDate = new Date(data.end_date).toISOString().split('T')[0];
          setInputValues({
            title: data.title,
            description: EditorState.createWithContent(
              convertFromRaw(JSON.parse(data.description))
            ),
            cloudProvider: data.cloud_provider,
            tags: data.tags.split(","),
            endDate: endDate,
          });
        })
        .catch((error) => console.log(error));
    else setErrors({ main: "Some error occured while fetching data" })
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    const inputErrors = editChallengeInputValidation(inputValues);

    if (isEmptyObject(inputErrors)) {
      editChallenge({
        ...inputValues,
        description: JSON.stringify(
          convertToRaw(inputValues.description.getCurrentContent())
        ),
        challengeId: challengeId,
      })
        .then(() => setSuccessMessage("Challenge is updated!!"))
        .catch((error) => {
          console.log(error.response);
          if (error.response)
            if (error.response.data) setErrors(error.response.data);
            else setErrors({ main: "Some Error Occured, Try Again!" });
          else setErrors({ main: "Some Error Occured, Try Again!" });
        });
    } else setErrors(inputErrors);
  };

  return (
    <AdminLayout>
      <div className="my-10 mx-40">
        <h1 className="text-3xl text-center font-bold my-5">
          Edit Challenge
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
            <label
              htmlFor="desription"
              className="block mb-1 font-bold text-gray-500"
            >
              Challenge Description
            </label>
            <RichTextEditor
              editorState={inputValues.description}
              setEditorState={(value) => {
                setInputValues({
                  ...inputValues,
                  description: value,
                });
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
            <label
              htmlFor="Cloud Provider"
              className="block mb-1 font-bold text-gray-500"
            >
              Cloud Provider
            </label>
            <input
              type="text"
              name="cloudProvider"
              value={inputValues.cloudProvider}
              onChange={handleInputChange}
              placeholder="Type cloud provider"
              className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
            />
            {!errors.cloudProvider ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.cloudProvider}</p>
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="Tags"
              className="block mb-1 font-bold text-gray-500"
            >
              Tags
            </label>
            <TagsInput
              tags={inputValues.tags}
              setTags={(value) => {
                setInputValues({
                  ...inputValues,
                  tags: value,
                });
              }}
            />
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
            <label
              htmlFor="End Date"
              className="block mb-1 font-bold text-gray-500"
            >
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
                onChange={() =>
                  setInputValues({
                    ...inputValues,
                    privacyCheck: !inputValues.privacyCheck,
                  })
                }
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
              Edit
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditChallenge;
