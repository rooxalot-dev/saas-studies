import Seo from '@components/Seo';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const TenantHome: NextPage = () => {
  const { query } = useRouter();
  const slug = query.slug ?? '';

  return (
    <div>
      <Seo title={`My SAAS - ${slug}`} />
      Hello Tenant {slug}
    </div>
  );
}

export default TenantHome;
