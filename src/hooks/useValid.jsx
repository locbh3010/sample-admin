import React, { useEffect } from "react";
import { toast } from "react-toastify";

export const useShowError = (errors) => {
  const errList = Object.values(errors);

  const handleShowErr = () =>
    errList.length > 0 && toast.error(errList[0].message);

  return [handleShowErr];
};
