import { NextPage } from 'next';
import Link from 'next/link';

import Container from '@components/Container';
import Subtitle from '@components/Subtitle';
import Title from '@components/Title';
import { useSession } from 'next-auth/react';
import OutlinedButton from '@components/OutlinedButton';
import { trpc } from '@libs/trpc';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tenant } from '@prisma/client';

const Tenants: NextPage = () => {
  const router = useRouter();
  const { data } = useSession();
  const { data: tenants, error } = trpc.useQuery(['tenants.get-my-tenants']);

  useEffect(() => {
    const redirectToTenantPage = async (tenant: Tenant) => {
      await router.push(`app/${tenant.id}`);
    }

    if (tenants && tenants.length === 1) {
      const [singleTenant] = tenants;
      redirectToTenantPage(singleTenant)
        .then(() => console.log('Redirected to single tenant page'))
        .catch((error) => console.error('Error redirecting to single tenant page', error));
    }
  }, [tenants]);

  if (error) return <div>Houve um problema ao carregar os Tenants: {error.message}</div>
  if (!tenants) return <div>Carregando...</div>

  return (
    <Container>
      <div className='flex flex-col h-full items-center mt-20'>
        <div className='mt-10'>

          <div className='mb-5 flex flex-col items-center'>
            <img
              className='rounded-full max-h-40'
              src={data?.user?.image ?? ''}
              title='User image' />
          </div>

          <div className='flex flex-col items-center'>
            <Title title={`Olá ${data?.user?.name ?? ''}`} />
            <Subtitle subtitle='Selecione um dos Tenants para iniciar'/>
          </div>

          <div className='mt-5'>
            {tenants?.map((tenant) => (
              <div className='text-center mb-2' key={tenant.id}>
                <OutlinedButton>
                  <Link href={`/app/${tenant.id}`}>
                    {tenant.name}
                  </Link>
                </OutlinedButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Tenants;
