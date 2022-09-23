import { NextPage } from 'next';

type LayoutProps = {
  children: React.ReactNode;
};

const LayoutEmpty: NextPage<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div>
      {children}
    </div>
  );
}

export default LayoutEmpty;
