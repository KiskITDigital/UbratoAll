import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import Typesense from "typesense";
import { executorList } from "@/types/app";
import { SearchResponseHit } from "typesense/lib/Typesense/Documents";
import {
  getExecutor,
  isFavoriteExecutor,
} from "@/api/index";

interface typesenseService { id: string, name: string, group_id: string, service_group_index: { id: string, name: string } }

export const generateSearchClient = (limit: number = 10, parameters?: { filter_by?: string }) => {
  const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
    server: {
      apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
      nodes: [
        {
          host: 'search.ubrato.ru',
          port: 443,
          protocol: 'https',
          path: ""
        }
      ]
    },
    additionalSearchParameters: {
      query_by: "name",
      limit: limit,
      ...parameters,
    },
  });

  return typesenseInstantsearchAdapter.searchClient
}

export const generateTypesenseClient = async (collection: string, parameters?: { per_page?: number, page?: number, filter_by?: string, sort_by?: "" | "name:asc" | "name:desc" | "created_at:asc" | "created_at:desc", include_fields?: string }) => {
  try {
    const client = new Typesense.Client({
      apiKey: `${import.meta.env.VITE_TYPESENSE_API_KEY}`,
      nodes: [
        {
          host: "search.ubrato.ru",
          port: 443,
          protocol: "https",
          path: ""
        },
      ],
    });

    const searchParameters = {
      q: "",
      query_by: "name",
      ...parameters,
    };

    const res = await client
      .collections(collection)
      .documents()
      .search(searchParameters)

    return res.hits || []
  } catch (e) {
    console.error("Typesense.Client error: ", e);
  }
}

export const getExecutorList = async (hits: SearchResponseHit<object>[] | undefined) => {
  const newExecutorList = [] as executorList[];
  const token = localStorage.getItem("token");

  const promises = (hits || [])
    .map((res, index) => {
      const { id } = res.document as { id: string };
      if (!id) return null;

      return (async () => {
        const data = await getExecutor(id);
        const isFavorite = (!!token && (await isFavoriteExecutor(id, token))?.data?.status) || false;

        // const serviceTypesFilter = data.contractorInfo.services.map((service: { id: number, name: string, price: number }) => service.id).reduce((acc: string, serviceId: number) => acc + serviceId + ", ", "")
        // console.log(serviceTypesFilter);


        (await generateTypesenseClient("service_type_index", { filter_by: `id:[${data.contractorInfo.services.map((service: { id: number, name: string, price: number }) => service.id).reduce((acc: string, serviceId: number) => acc + serviceId + ", ", "")}]`, per_page: 250, include_fields: "$service_group_index(id, name)" }))?.map(document => document.document).forEach((service: typesenseService | object) => {
          if (!("id" in service)) return;
          const serviceToFind = data.contractorInfo.services.find((serviceFromData: { id: number }) => +service.id === serviceFromData.id)
          serviceToFind.group_name = service.service_group_index.name
          serviceToFind.name = service.name.slice(0, 1).toLocaleLowerCase() + service.name.slice(1)
        })
        // console.log(serviceGroupHits);

        return {
          index,
          executorData: {
            id: data.organizationInfo.id,
            img: data.organizationInfo.avatar
              ? `${data.organizationInfo.avatar?.replace("/files", "")}`
              : "/avatar-ic.svg",
            name: data.organizationInfo.short_name,
            inn: data.organizationInfo.inn,
            text: data.contractorInfo.description,
            regions: data.contractorInfo.locations,
            services: data.contractorInfo.services,
            areServicesHidden: data.contractorInfo.services.length > 5,
            isFavorite: isFavorite,
            isTextHidden: true
          },
        } as { index: number; executorData: executorList };

      })();
    })
    .filter((promise) => promise !== null);

  const results = await Promise.all(promises);

  results
    .sort((a, b) => a!.index - b!.index)
    .forEach((result) => {
      newExecutorList.push(result!.executorData);
    });

  // console.log(newExecutorList);

  return newExecutorList
}