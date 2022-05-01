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

export const getOfferings = async (page=1, limit=8) => {
  const endpoint = `/api/offering/multiple/${page}/${limit}`;
  return await api.get(endpoint);
};

export const getSingleOffering = async (id) => {
  const endpoint = `/api/offering/single/${id}`;
  return await api.get(endpoint);
};
