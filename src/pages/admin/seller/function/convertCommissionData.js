export const convertCommissionData = (sellerData) => {
  let data;
  if (typeof sellerData === "string") {
    if (sellerData?.trim()?.startsWith("a:")) {
      data = {};
    } else data = JSON.parse(sellerData);
  } else data = sellerData;

  return Object.values(data)?.map((item) => ({
    from: item?.price_range?.[0],
    to: item?.price_range?.[1] || null,
    commission: item?.value,
  }));
};
