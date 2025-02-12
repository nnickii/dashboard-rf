import React, { FC } from "react";

interface TitleProps {
  title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <header>
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
    </header>
  );
};

export default Title;
