import { NextPage } from 'next';

type LayoutProps = {
  children: React.ReactNode;
};

const LayoutTenant: NextPage<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div>
      LayoutTenant
      {children}
    </div>
  );
}

export default LayoutTenant;
