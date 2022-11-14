import React, { useEffect } from "react";

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <div>{children}</div>;
};

export default ScrollToTop;
