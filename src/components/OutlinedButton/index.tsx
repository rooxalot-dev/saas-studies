import React, { HTMLAttributes } from 'react';

type OutlinedButtonProps = HTMLAttributes<HTMLButtonElement> & {};

const OutlinedButton: React.FC<OutlinedButtonProps> = ({ children, ...rest }) => {
  return (
    <button {...rest} className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">
      {children}
    </button>
  );
}

export default OutlinedButton;
