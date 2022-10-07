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
      setLinks(data.data as Link[]);
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
    console.log('pageParams.currentPage', pageParams.currentPage);
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

      <div className="container mx-auto px-4 sm:px-8 ">
        {isLoading && <Loading />}
        {
          !isLoading && (
            <div className="py-8">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex flex-end">
                <div className="text-end">
                  <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                    <div className=" relative ">
                      <input type="text" id="&quot;form-subscribe-Filter" className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="name" />
                    </div>
                    <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                      Filter
                    </button>
                  </form>
                </div>
              </div>

              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Nome interno
                      </th>
                      <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Nome público
                      </th>
                      <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Slug
                      </th>
                      <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Destino
                      </th>
                      <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Link Interno
                      </th>
                      <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Dt. Criado
                      </th>
                      <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                        Dt.Atualizado
                      </th>
                      <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {links.map((link) => (
                      <tr key={link.id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {link.internalName}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {link.publicName}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {link.slug}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {link.destination}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {link.internalLink}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {link.createdAt.toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {link.updatedAt.toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Button onClick={() => handleDeleteLink(link.id)}>Excluir</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                  <div className="flex items-center">
                    <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                      <svg width={9} fill="currentColor" height={8} className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                        </path>
                      </svg>
                    </button>
                    {
                      [...Array(data?.totalPages)].map((_, page) => (
                        <button
                          key={page}
                          type="button"
                          className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100"
                          onClick={() => handlePageChange(page + 1)}>
                          {page + 1}
                        </button>
                      ))
                    }
                    <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                      <svg width={9} fill="currentColor" height={8} className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                        </path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>

    </Container>
  )
}

export default Links;
