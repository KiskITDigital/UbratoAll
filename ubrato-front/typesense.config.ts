import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: 'R5PQLVrGuPubEcLIdGIJhjip5kvdXbFu',
    nodes: [
      {
        host: 'search.ubrato.ru',
        port: 443,
        protocol: 'https',
        path: "",
        // tls:true
      }
    ]
  },
  additionalSearchParameters: {
    query_by: "name,",
  },
});


export const searchClient = typesenseInstantsearchAdapter.searchClient

