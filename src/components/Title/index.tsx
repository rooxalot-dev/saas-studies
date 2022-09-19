import React from 'react';

type TitleProps = {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }: TitleProps) => {
  return (
    <h1 className="text-4xl font-semibold text-gray-800 light:text-white">
      {title}
    </h1>
  );
}

export default Title;
