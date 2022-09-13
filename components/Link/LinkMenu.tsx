import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type LinkMenuProps = {
  path: string;
  children: React.ReactNode;
};

const LinkMenu: React.FC<LinkMenuProps> = ({ children, path }: LinkMenuProps) => {
  const { pathname } = useRouter();
  const unselectedClasses = 'w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent';
  const selectedClasses = 'w-full text-gray-800 light:text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 border-purple-500';

  return (
    <Link href={path}>
      <a className={ pathname === path ? selectedClasses : unselectedClasses }>
        {children}
      </a>
    </Link>
  );
}

export default LinkMenu;
