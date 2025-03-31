export const convertCommissionData = (sellerData) => {
  console.log("sellerData: ", sellerData);
  const parsedData = JSON.parse(sellerData);
  return Object.values(parsedData)?.map((item) => ({
    from: item.price_range[0],
    to: item.price_range[1] || null,
    commission: item.value,
  }));
};
