import React from 'react';

type SubtitleProps = {
  subtitle: string;
}

const Subtitle: React.FC<SubtitleProps> = ({ subtitle }: SubtitleProps) => {
  return (
    <h2 className="text-md text-gray-400">
      {subtitle}
    </h2>
  );
}

export default Subtitle;
