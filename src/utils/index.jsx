import { useSelector } from "react-redux";

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

export const formattedNumber = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatNumberOrDefault = (value) => {
  if (
    value !== undefined &&
    value !== null &&
    value !== "NaN" &&
    !isNaN(value) &&
    value !== ""
  ) {
    return formattedNumber.format(Number(value));
  }
  return formattedNumber.format(0);
};

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

export const getClassSelfSeller = (sellerFlagAction, selfSellingFlag) => {
  if (sellerFlagAction) {
    if (sellerFlagAction == 1 && selfSellingFlag == 1) {
      return "btn dark_green";
    } else {
      return "btn !bg-[#dadee1] light_grey ";
    }
  } else {
    return "btn dark_yellow";
  }
};

export const getClassPartnerSeller = (
  sellerFlagAction,
  sellerPartnershipDate
) => {
  if (sellerFlagAction) {
    if (sellerFlagAction === 1 && sellerPartnershipDate != "") {
      return "btn dark_green";
    } else {
      return "btn !bg-[#dadee1] light_grey ";
    }
  } else {
    return "btn dark_yellow";
  }
};

export const languageToCountry = {
  en: "us", // English - United States
  esp: "es", // Spanish - Spain
  ita: "it", // Italian - Italy
  cn: "cn", // Chinese - China
  indu: "in", //India
  th: "th", // Thailand
  jp: "jp", // Japan,
  pt: "pt", // Português
  al: "al", //Albanian,
  hb: "hb", // Hebrew
};

export const convertUnixToDate = (unixTimestamp) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(+unixTimestamp));
};

export const convertUnixToDateTime = (unixTimestamp) => {
  return new Intl.DateTimeFormat("en-gb", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h12",
    timeZone: "UTC",
  }).format(new Date(+unixTimestamp * 1000));
};
