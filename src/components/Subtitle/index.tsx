import React from 'react';

type SubtitleProps = {
  subtitle: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ subtitle }: SubtitleProps) => {
  return (
    <h1 className="text-md text-gray-400">
      {subtitle}
    </h1>
  );
}

export default Subtitle;
