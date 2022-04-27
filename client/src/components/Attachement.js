import { useEffect } from "react"
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export const Attachment = ({ attachmentData }) => {
  const [attachment, setAttachement] = useState("");

  useEffect(() => {
    if (attachmentData)
      new Blob(
        [new Uint8Array(attachmentData.data)],
        {type: ".pdf"}
      )
        .text()
        .then((result) => setAttachement(result));
  }, [attachmentData]);
  
  return (
    <a
      className="bg-pink-600 text-white ml-4 px-2 py-1 rounded"
      href={attachment}
      download="Attachement.pdf"
    >
      View Attachment
      <FontAwesomeIcon icon={faPaperclip} className="p-0 pl-1" />
    </a>
  );
};