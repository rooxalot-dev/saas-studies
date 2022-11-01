import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import Container from '@components/Container';
import Subtitle from '@components/Subtitle';
import Title from '@components/Title';
import Form from '@components/Form/Form';
import { FormInput } from '@components/Form/FormInput';

import { trpc } from '@libs/trpc';
import { Loading } from '@components/Loading';

import { getTenantIdFromRouter } from 'src/common/helpers';
import { useEffect } from 'react';

type NewLinkForm = {
  internalName: string;
  publicName: string;
  slug: string;
  destination: string;
  internalLink: string;
};

const Links: NextPage = () => {
  const router = useRouter();
  const [,linkId] = router.query.linkId as string[];
  const tenantId = getTenantIdFromRouter(router);
  const mutation = trpc.useMutation(['links.save-link']);
  const { isLoading, isError, refetch, data } = trpc.useQuery(['links.get-by-id', { linkId }], {
    enabled: !!linkId,
  });
  
  const handleSaveLink = async (newLink: NewLinkForm) => {
    const mutateData = {
      ...newLink,
      id: linkId,
      tenantId: tenantId,
    };

    try {
      await mutation.mutateAsync(mutateData);
      toast.success('Link salvo com sucesso!', {
        onClose: async () => await router.push(`/app/${tenantId}/links`)
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (linkId) {

    }
  }, [linkId]);

  return (
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='titles'>
          <Title title='Gerenciador de Links' />
          <Subtitle subtitle={linkId ? 'Editando Link' : 'Novo Link'} />
        </div>

        <div className="flex items-center md:justify-self-end">
          <button type="button" className="border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2">
            Criar Link
          </button>
          <button type="button" className="border-t border-b border-r text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2">
            Criar Grupo
          </button>
        </div>
      </div>

      {linkId && isLoading && <Loading />}

      {!isLoading && (
        <div className="container leading-loose mt-10">
          <Form
            formDataType={{} as NewLinkForm}
            dataMap={() => data}
            formSubmit={(data: NewLinkForm) => handleSaveLink(data)}
            clearOnSubmit
            className="p-10 m-auto bg-gray-200 bg-opacity-10 rounded shadow-xl"
          >
            <p className="mb-8 text-2xl font-light text-center text-black">
              Criar Link
            </p>
            <div className="space-y-6">
              {/* Identificação */}
              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-1/3">
                  Identificação
                </h2>
                <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                  <div>
                    <div className=" relative">
                      <FormInput
                        type="text"
                        name="internalName"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Nome interno"
                      />
                    </div>
                    <div className=" relative mt-2">
                      <FormInput
                        type="text"
                        name="publicName"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Nome publico"
                      />
                    </div>

                    <div className=" relative mt-2">
                      <FormInput
                        type="text"
                        name="slug"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="Identificação (slug)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              {/* Destino */}
              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-1/3">
                  Destino
                </h2>
                <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                  <div>
                    <div className=" relative">
                      <FormInput
                        type="text"
                        name="destination"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="http(s)://"
                      />
                    </div>
                    <div className=" relative mt-2">
                      <FormInput
                        type="text"
                        name="internalLink"
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        placeholder="TBD Link Interno para app"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                <button
                  disabled={mutation.isLoading}
                  type="submit"
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center flex justify-center items-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                  {mutation.isLoading ? <Loading /> : 'Save'}
                </button>
              </div>
            </div>
          </Form>
        </div>
      )}

    </Container>
  )
}

export default Links;
