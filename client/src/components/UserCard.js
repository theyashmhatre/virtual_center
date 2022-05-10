import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DisplayPicture } from "./DisplayPicture";

export const UserCard = ({name, email, displayPicture}) => {
  return (
    <div className="flex flex-col rounded-lg shadow-lg border-2 sm:text-sm w-full py-2 px-5 sm:px-2 my-4">
      <div className="flex justify-center items-center">
        <div className="mr-1">
          <DisplayPicture
            displayPicture={displayPicture}
            size="sm"
            boxSize={5}
          />
        </div>
        <p className="font-semibold break-all">{name}</p>
      </div>
      <div className="flex justify-center items-center">
        <FontAwesomeIcon
          icon={faEnvelope}
          size="lg"
          className="p-1"
        />
        <p className="font-serif break-all">{email}</p>
      </div>
    </div>
  );
};
