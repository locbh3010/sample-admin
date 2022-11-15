import React from "react";
import JoditEditor from "jodit-react";
import { useController } from "react-hook-form";

const Editor = ({ value = "", name, control }) => {
  const { field } = useController({
    control,
    name,
  });
  return (
    <div>
      <JoditEditor value={value} name={name} {...field} />
    </div>
  );
};

export default Editor;
