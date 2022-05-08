import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export const DisplayPicture = ({displayPicture, size, boxSize}) => {
  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (displayPicture)
      new Blob(
        [new Uint8Array(displayPicture.data)],
        {type: ".png"}
      )
        .text()
        .then((result) => setPicture(result));
  }, [displayPicture]);

  return (
    <div className={`rounded-full h-${boxSize} w-${boxSize}`}>
      {!picture ? (
        <div className="flex justify-center items-center h-full w-full">
          <FontAwesomeIcon
            icon={faUser}
            size={size}
            className="p-2 rounded-full"
          />
        </div>
      ) : (
        <img
          className="object-fill h-full w-full rounded-full"
          src={picture}
        />
      )}
    </div>
  );
};
