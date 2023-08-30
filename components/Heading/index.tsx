import React from "react";

interface IProps {
  children: React.ReactNode;
}

const Heading = ({ children }: IProps): JSX.Element => {
  return <h1 className="text-2xl font-bold pb-3">{children}</h1>;
};

export default Heading;
