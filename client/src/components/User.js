import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const User = ({name, email}) => {
  return (
    <div className="flex flex-col rounded-lg shadow-lg border-2 w-fit py-2 px-5 my-4">
      <p className="font-semibold flex justify-center align-bottom">
        <FontAwesomeIcon
          icon={faUser}
          size="sm"
          className="p-1"
        />
        {name}
      </p>
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
