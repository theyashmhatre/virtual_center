import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DisplayPicture } from "./DisplayPicture";


export const UserCard = ({name, email, displayPicture}) => {
  return (
    <div className="flex flex-col rounded-lg shadow-lg border-2 w-fit py-2 px-5 my-4">
      <div className="flex justify-center items-center">
        <div className="mr-1">
          <DisplayPicture
            displayPicture={displayPicture}
            size="sm"
            boxSize={5}
          />
        </div>
        <p className="font-semibold">{name}</p>
      </div>
      <div>
        <div className="flex justify-center">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="lg"
            className=" p-1"
          />
          <p className="font-serif">{email}</p>
        </div>
      </div>
    </div>
  );
};
