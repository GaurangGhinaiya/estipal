export const extractImageUrls = (data) => {
    const urlRegex = /https?:\/\/[^";]+/g;
    return data?.match(urlRegex) || [];
  };
