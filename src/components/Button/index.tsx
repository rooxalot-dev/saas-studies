import React, { HtmlHTMLAttributes } from 'react';

type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      type="button"
      className="border-l border-t border-b text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 px-4 py-2"
    >
      {children}
    </button>
  );
}

export default Button;
