import React, { FC } from "react";

interface TitleProps {
  title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <header>
      <h3 className="text-1xl sm:text-4xl md:text-5xl lg:text-3xl font-semibold text-white">
        {title}
      </h3>
    </header>
  );
};

export default Title;
