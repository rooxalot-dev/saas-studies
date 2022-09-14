import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children}: ContainerProps) => {
  return (
    <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
      {children}
    </div>
  );
}

export default Container;
