export const convertCommissionData = (sellerData) => {
  // const parsedData = JSON.parse(sellerData);
  const data =
    typeof sellerData === "string" ? JSON.parse(sellerData) : sellerData;
  return Object.values(data)?.map((item) => ({
    from: item?.price_range?.[0],
    to: item?.price_range?.[1] || null,
    commission: item?.value,
  }));
};
