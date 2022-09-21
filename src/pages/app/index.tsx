import { NextPage } from 'next';
import Link from 'next/link';

import Container from '@components/Container';
import Subtitle from '@components/Subtitle';
import Title from '@components/Title';
import { useEffect, useState } from 'react';
import { getUserTenants } from 'src/services/tenantService';
import { useSession } from 'next-auth/react';
import { Tenant } from '@prisma/client';

const Tenants: NextPage = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  return (
    <Container>
      <Title title='Tenants' />
      <Subtitle subtitle='Tenants' />

      <div>
        {tenants?.map((tenant) => (
          <Link key={tenant.id} href={`/app/${tenant.id}`}>
            {tenant.name}
          </Link>
        ))}
      </div>
    </Container>
  );
}

export default Tenants;
