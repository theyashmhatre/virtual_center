import { faAngleRight, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DisplayPicture } from "./DisplayPicture";

export const UserCard = ({name, email, displayPicture}) => {
  return (
    <div className="flex justify-between items-center rounded-lg bg-pink-50 sm:text-sm w-full cursor-pointer py-2 pl-3 pr-5 sm:px-2 my-4">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="mr-2">
            <DisplayPicture
              displayPicture={displayPicture}
              size="sm"
              boxSize={5}
            />
          </div>
          <p className="font-semibold break-all text-center">{name}</p>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="sm"
            className="p-1 mr-1"
          />
          <p className="font-serif break-all text-center">{email}</p>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faAngleRight}
        size="2x"
        className="p-1 text-pink-700"
      />
    </div>
  );
};
