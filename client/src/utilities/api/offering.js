import api from "./index";

export const createOffering = async ({
  offeringTitle,
  offeringDescription,
  ownerName,
  ownerEmail,
  attachment
}) => {
  const endpoint = "/api/offering/create";
  return await api.post(
    endpoint,
    {
      attachment,
      offeringTitle,
      offeringDescription,
      ownerName,
      ownerEmail,
      industryName: "industry"
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const editOffering = async ({
  offeringId,
  offeringTitle,
  offeringDescription,
  ownerName,
  ownerEmail,
  attachment
}) => {
  const endpoint = `/api/offering/edit/${offeringId}`;
  return await api.post(
    endpoint,
    {
      offeringTitle,
      offeringDescription,
      ownerName,
      ownerEmail,
      attachment,
      industryName: "industry"
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteOffering = async (offeringId) => {
  const endpoint = `/api/offering/delete/${offeringId}`;
  return await api.delete(endpoint);
};

export const getOfferings = async (page=1, limit=8) => {
  const endpoint = `/api/offering/multiple/${page}/${limit}`;
  return await api.get(endpoint);
};

export const getSingleOffering = async (id) => {
  const endpoint = `/api/offering/single/${id}`;
  return await api.get(endpoint);
};

export const getDeletedOfferings = async (pageNo=1, limit=10) => {
  const endpoint = `/api/offering/deleted-offerings/${pageNo}/${limit}`;
  return await api.get(endpoint);
};
