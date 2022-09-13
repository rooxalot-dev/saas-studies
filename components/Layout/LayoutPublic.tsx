import { NextPage } from 'next';

type LayoutProps = {
  children: React.ReactNode;
};

const LayoutPublic: NextPage<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div>
      LayoutPublic
      {children}
    </div>
  );
}

export default LayoutPublic;
