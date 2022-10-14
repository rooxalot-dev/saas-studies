import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

import Container from '@components/Container';
import Subtitle from '@components/Subtitle';
import Title from '@components/Title';

import { Link } from '@prisma/client';
import { trpc } from '@libs/trpc';
import { Loading } from '@components/Loading';

import { getTenantIdFromRouter } from 'src/common/helpers';
import { toast } from 'react-toastify';
import Button from '@components/Button';
import PageableTable from '@components/PageableTable';

const Links: NextPage = () => {
  const tenantId = getTenantIdFromRouter(useRouter());

  const [links, setLinks] = useState<Link[]>([]);
  const [pageParams, setPageParams] = useState({
    currentPage: 1,
    pageSize: 5,
    totalPages: 1,
  });

  const { isLoading, isError, refetch, data } = trpc.useQuery(['links.pageable.get-by-tenant', {
    tenantId,
    page: pageParams.currentPage,
    size: pageParams.pageSize,
  }]);
  const deleteMuration = trpc.useMutation(['links.delete-link']);

  useEffect(() => {
    if (!isError && data) {
      setLinks(data.data);
      setPageParams((oldValue) => {
        return {
          ...oldValue,
          totalPages: data.totalPages,
        };
      });
    } else {
      setLinks([]);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [pageParams.currentPage]);

  const handleDeleteLink = async (linkId: string) => {
    try {
      await deleteMuration.mutateAsync({
        linkId
      });
      toast.success('Link removido com sucesso!');
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePageChange = (page) => {
    setPageParams((oldValue) => {
      return { ...oldValue, currentPage: page };
    });
  }

  return (
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='titles'>
          <Title title='Gerenciador de Links' />
          <Subtitle subtitle='Links cadastrados' />
        </div>

        <div className="flex items-center md:justify-self-end">
          <NextLink href={`/app/${tenantId}/links/mutate`}>
            <Button>Criar Link</Button>
          </NextLink>
        </div>
      </div>

      <div className="container mt-4">
        {isLoading && <Loading />}
        {
          !isLoading && data && <PageableTable
            data={data}
            columns={[
              { columnName: 'Nome interno', dataPropName: 'internalName' },
              { columnName: 'Nome público', dataPropName: 'publicName' },
              { columnName: 'Slug', dataPropName: 'slug' },
              { columnName: 'Destino', dataPropName: 'destination' },
              { columnName: 'Link Interno', dataPropName: 'internalLink' },
              { columnName: 'Dt. Criado', dataPropName: 'createdAt', render: (obj) => obj.createdAt.toLocaleDateString(), },
              { columnName: 'Dt.Atualizado', dataPropName: 'updatedAt', render: (obj) => obj.updatedAt.toLocaleDateString() },
              { columnName: 'Actions', dataPropName: 'Actions', render: (obj) => (
                <Button onClick={() => handleDeleteLink(obj.id)}>Excluir</Button>
              ) },
            ]}
            keyExtractor={(obj) => obj.id}
            handlePageChange={handlePageChange}
          />
        }
      </div>

    </Container>
  )
}

export default Links;
