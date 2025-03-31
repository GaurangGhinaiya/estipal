export const extractImageUrls = (data) => {
  const urlRegex = /https?:\/\/[^";]+/g;
  return data?.match(urlRegex) || [];
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formattedNumber = new Intl.NumberFormat("en-US");

export const formatCurrency = (price, currency) => {
  if (price) {
    return `${currency} ${parseFloat(price).toLocaleString("en", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return "";
};

export const getCurrentYear = () => {
  return new Date().getFullYear();
};
