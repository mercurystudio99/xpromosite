import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string; // Optional to pass additional classes
}

const PageWrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return <div className={` p-5 ${className}`}>{children}</div>;
};

export default PageWrapper;
