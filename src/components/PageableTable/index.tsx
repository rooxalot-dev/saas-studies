import React from 'react';
import { IPageable } from 'src/models/Pageable';

type PageableTableProps<T extends {}> = {
  data: IPageable<T>;
  columns: {
    columnName: string,
    dataPropName: string,
    render?: (obj: T | any) => any,
  }[],
  keyExtractor: (obj: T) => React.Key,
  handlePageChange: (newPage: number) => void,
};

const PageableTable = <T extends {}>({ data, columns, keyExtractor, handlePageChange }: PageableTableProps<T>) => {
  const getvalue = (obj: T, column: {
    columnName: string,
    dataPropName: string,
    render?: (obj: T | any) => any,
  }) => {
    const value = obj[column.dataPropName];

    if (!value && !column.render) {
      return '';
    }

    return column.render ? column.render(obj) : value;
  };

  return (
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
              {columns.map((column) => (
                <th key={column.columnName} scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                  {column.columnName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((obj) => (
              <tr key={keyExtractor(obj)}>
                {columns.map((column) => (
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {getvalue(obj, column)}
                    </p>
                  </td>
                ))}
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
  );
}

export default PageableTable;
