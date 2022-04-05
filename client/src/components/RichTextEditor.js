import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = ({ editorState, setEditorState, placeholder }) => {
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="rounded-lg"
        wrapperClassName="border-2 rounded-lg"
        editorClassName="leading-4 pl-2"
        onEditorStateChange={(e) => setEditorState(e)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
