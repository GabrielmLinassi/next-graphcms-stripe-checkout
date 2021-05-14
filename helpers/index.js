export const getFilename = (url) => {
  return removeExt(url.split("/")[url.split("/").length - 1].replaceAll("%", "_"));
};

const removeExt = (url) => {
  return url
    .split(".")
    .slice(0, url.split(".").length - 1)
    .join(".");
};
