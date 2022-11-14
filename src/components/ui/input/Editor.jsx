import React from "react";
import JoditEditor from "jodit-react";

const Editor = ({ value = "", setValue }) => {
  return (
    <div>
      <JoditEditor
        value={value}
        onChange={(content) => setValue(content)}
        onBlur={(content) => setValue(content)}
      />
    </div>
  );
};

export default Editor;
