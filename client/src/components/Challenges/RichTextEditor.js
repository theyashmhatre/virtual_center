import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = ({ editorState, setEditorState }) => {
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="rounded-lg"
        wrapperClassName="border-2 rounded-lg"
        editorClassName="leading-4 pl-2"
        onEditorStateChange={(e) => setEditorState(e)}
        placeholder="Type challenge description here"
      />
    </div>
  );
};

export default RichTextEditor;
