import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { roleIds } from "../../../constants";
import RichTextEditor from "../../components/RichTextEditor";
import MainLayout from "../../layouts/MainLayout";
import { editOffering, getSingleOffering } from "../../utilities/api/offering";
import { isEmptyObject } from "../../utilities/utils";
import { editOfferingInputValidation } from "../../utilities/validation/offering";

const initialInputValues = {
  offeringTitle: '',
  offeringDescription: EditorState.createEmpty(),
  ownerName: '',
  ownerEmail: '',
  attachment: '',
  attachmentValue: '',
  privacyCheck: false,
};

const EditOffering = () => {
  const [inputValues, setInputValues] = useState(initialInputValues);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { offeringId } = useParams();

  const handleInputChange = (e) => {
    let { name, value, type, files } = e.target;

    setInputValues({
      ...inputValues,
      [name]: type == "file" ? files[0] : value,
    });
  };

  const handleEdit = (attachment) => {
    editOffering({
      offeringId: offeringId,
      ...inputValues,
      attachment: attachment,
      offeringDescription: JSON.stringify(convertToRaw(inputValues.offeringDescription.getCurrentContent()))
    })
      .then(() => setSuccessMessage("Offering is updated!!"))
      .catch((error) => {
        if (error.response)
          if (error.response.data) setErrors(error.response.data);
          else setErrors({ main: "Some Error Occured, Try Again!" });
        else setErrors({ main: "Some Error Occured, Try Again!" });
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    const inputErrors = editOfferingInputValidation(inputValues);

    if (isEmptyObject(inputErrors)) {
      if (!inputValues.attachment) {
        new Blob(
          [new Uint8Array(inputValues.attachmentValue.data)],
          {type: ".pdf"}
        )
          .text()
          .then((result) => {
            handleEdit(result);
          });
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        handleEdit(reader.result);
      };

      reader.onerror = () => setErrors({
        main: "Error while reading attachment"
      });
      
      reader.readAsDataURL(inputValues.attachment);
    } else setErrors(inputErrors);
  };

  useEffect(() => {
    getSingleOffering(offeringId)
      .then(({ data }) => {
        setInputValues({
          offeringTitle: data.title,
          offeringDescription: EditorState.createWithContent(
            convertFromRaw(JSON.parse(data.description))
          ),
          attachmentValue: data.attachment,
          ownerName: data.owner_name,
          ownerEmail: data.owner_email,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <MainLayout role={roleIds["super_admin"]}>
      <div className="my-10 mx-40">
        <h1 className="text-3xl text-center font-bold my-5">
          Edit Offering
        </h1>
        <div className="space-y-5">
          <div>
            <label className="block mb-1 font-bold text-gray-500">Title</label>
            <input
              type="text"
              name="offeringTitle"
              value={inputValues.offeringTitle}
              onChange={handleInputChange}
              placeholder="Type the offering title here"
              className="w-full border-2 border-gray-200 p-3 rounded-lg outline-none focus:border-purple-500"
            />
            {!errors.offeringTitle ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.offeringTitle}</p>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Offering Description
            </label>
            <RichTextEditor
              editorState={inputValues.offeringDescription}
              setEditorState={(value) => {
                setInputValues({
                  ...inputValues,
                  offeringDescription: value
                })
              }}
              placeholder="Type offering description here"
            />
            {!errors.offeringDescription ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.offeringDescription}</p>
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
              name="attachment"
              onChange={handleInputChange}
              placeholder="Upload attachment in pdf format"
              className="border-2 rounded-lg w-full"
            />
            {!errors.attachment ? null : (
              <div className="text-center text-red-700 text-lg mb-5">
                <p>{errors.attachment}</p>
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
              Update
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditOffering;