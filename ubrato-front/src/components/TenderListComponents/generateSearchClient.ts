import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter';
import Typesense from 'typesense';

export const generateSearchClient = (limit: number = 10, parameters?: { filter_by?: string }) => {
  const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
    server: {
      apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
      nodes: [
        {
          host: `${import.meta.env.VITE_TYPESENSE_API_URI}`,
          port: import.meta.env.VITE_TYPESENSE_API_PORT,
          protocol: 'https',
          path: '',
        },
      ],
    },
    additionalSearchParameters: {
      query_by: 'name',
      limit: limit,
      ...parameters,
    },
  });

  return typesenseInstantsearchAdapter.searchClient;
};

export const generateTypesenseClient = async (
  collection: string,
  parameters?: {
    per_page?: number;
    page?: number;
    filter_by?: string;
    sort_by?: '' | 'name:asc' | 'name:desc' | 'created_at:asc' | 'created_at:desc';
    include_fields?: string;
  }
) => {
  try {
    const client = new Typesense.Client({
      apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
      nodes: [
        {
          host: 'search.ubrato.ru',
          port: 443,
          protocol: 'https',
          path: '',
        },
      ],
    });

    const searchParameters = {
      q: '',
      query_by: 'name',
      ...parameters,
    };

    const res = await client.collections(collection).documents().search(searchParameters);

    return res.hits || [];
  } catch (e) {
    console.error('Typesense.Client error: ', e);
  }
};
