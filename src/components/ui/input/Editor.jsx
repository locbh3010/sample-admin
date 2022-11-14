import React from "react";
import JoditEditor from "jodit-react";

const Editor = ({ value = "", setValue, field }) => {
  return (
    <div>
      <JoditEditor
        value={value}
        onChange={(content) => setValue(field, content)}
        onBlur={(content) => setValue(field, content)}
      />
    </div>
  );
};

export default Editor;
