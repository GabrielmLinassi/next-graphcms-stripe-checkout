export const getFilename = (url) =>
  removeExt(url.split("/")[url.split("/").length - 1].replaceAll("%", "_"));
const removeExt = (url) =>
  url
    .split(".")
    .slice(0, url.split(".").length - 1)
    .join(".");
