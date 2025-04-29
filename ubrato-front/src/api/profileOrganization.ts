import { axiosInstance } from '@/utils';

export interface orgInfoT {
  id: string;
  brand_name: string;
  full_name: string;
  short_name: string;
  inn: string;
  okpo: string;
  ogrn: string;
  kpp: string;
  tax_code: number;
  address: string;
  avatar: string;
  email: [
    {
      contact: string;
      info: string;
    }
  ];
  phone: [
    {
      contact: string;
      info: string;
    }
  ];
  messenger: [
    {
      contact: string;
      info: string;
    }
  ];
  user_id: string;
  update_at: string;
  created_at: string;
}

export const fetchOrganizationInfo = async (token: string) => {
  const res = await axiosInstance.get<orgInfoT>('/v1/organizations/my', {
    headers: { authorization: `Bearer ${token}` },
  });
  // console.log(res);
  return res.data;
};

export const fetchOrdererProfile = async (token: string) => {
  const res = await axiosInstance.get<{
    description: string;
    locations: { id: number; name: string }[];
  }>('/v1/organizations/my/profile/customer', {
    headers: { authorization: `Bearer ${token}` },
  });
  // console.log(res.data);
  return res.data;
};

export const putOrdererProfile = async (
  token: string,
  params: { description: string; locations: number[] }
) => {
  await axiosInstance.put('/v1/organizations/my/profile/customer', params, {
    headers: { authorization: `Bearer ${token}` },
  });
  // console.log(res);
};

export const putBrandData = async (token: string, params: { name: string; avatar: string }) => {
  await axiosInstance.put('/v1/organizations/my/profile/brand', params, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export interface contacntsT {
  emails: {
    contact: string;
    info: string;
  }[];
  phones: {
    contact: string;
    info: string;
  }[];
  messengers: {
    contact: string;
    info: string;
  }[];
}

export const putBrandContacts = async (token: string, params: contacntsT) => {
  await axiosInstance.put('/v1/organizations/my/profile/brand/contacts', params, {
    headers: { authorization: `Bearer ${token}` },
  });
  // console.log(res);
};

export interface contractorProfileData {
  description: string;
  locations: {
    id: number;
    name: string;
  }[];
  services: {
    id: number;
    name: string;
    price: number;
  }[];
  objects: {
    id: number;
    name: string;
  }[];
  portfolio: {
    id: string;
    name: string;
    description: string;
    links: string[];
  }[];
}

interface IPortfolio {
  name: string;
  description: string;
  imgs: string[];
}
interface IPortfolioPut {
  id: string;
  params: { name: string; description: string; imgs: string[] };
}

export const fetchContractorProfile = async (token: string) => {
  const res = await axiosInstance.get<contractorProfileData>(
    '/v1/organizations/my/profile/contractor',
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const putContractorProfile = async (
  token: string,
  params: {
    description: string;
    locations: number[];
    services: {
      id: number;
      price: number;
    }[];
    objects: number[];
  }
) => {
  await axiosInstance.put('/v1/organizations/my/profile/contractor', params, {
    headers: { authorization: `Bearer ${token}` },
  });
  // console.log(res);
};

export const postPortfolio = async (token: string, params: IPortfolio) => {
  const newParams = {
    name: params.name,
    description: params.description,
    links: params.imgs
  }
  const res = await axiosInstance.post<{ id: string }>('/v1/organizations/my/profile/cv', newParams, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res.data.id;
};

export const putPortfolio = async (token: string, params: IPortfolioPut) => {
  const newParams = {
    name: params.params.name,
    description: params.params.description,
    links: params.params.imgs
  }
  await axiosInstance.put(
    `/v1/organizations/my/profile/cv/${params.id}`,
    newParams,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  // console.log(res)
};

export const deletePortfolio = async (token: string, id: string) => {
  await axiosInstance.delete(`/v1/organizations/my/profile/cv/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  // console.log(res);
};
