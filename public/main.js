/** @param {string} url: */
function convertTwitter(url) {
  const regex = /(.*\.\w{1,3})/;
  const newUrl = url.replace(regex, "nitter.net");
  return newUrl;
}

/** @param {string} url: */
function convertbluesky(url) {
  const regex = /(.*\.\w{1,3})/;
  const newUrl = url.replace(regex, "clearsky.app");
  return newUrl;
}

/** @param {string} url: */
function convertTiktok(url) {
  const regex = /(.*\.\w{1,3})/;
  const newUrl = url.replace(regex, "seetiktok.com");
  return newUrl;
}

/** @param {string} url: */
function convertInstagram(url) {
  const regex = /\/(\/?p?\/?\w*)\/?(?:\s|$|\?|\&)/;
  const match = url.replace("/reel/", "/p/").match(regex);
  if (match) {
    const newUrl = `imginn.com/${match[1]}`;
    return newUrl;
  }
}

/** @param {string} url: */
function getServiceName(url) {
  const regex = /(?:https?:\/\/)?(?:www.)?(.+)\./;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
}

/** @param {string} url: */
function setNewLink(url) {
  const outputElement = document.querySelector(".output");
  const link = document.createElement("a");
  link.innerHTML = url;
  link.href = `https://${url}`;
  link.target = "_blank";
  outputElement.innerHTML = "";
  outputElement.appendChild(link);
}

/** @param {string} value */
function onInput(value) {
  const service = getServiceName(value);
  switch (service) {
    case "twitter":
    case "x":
      setNewLink(convertTwitter(value));
      break;
    case "tiktok"
      setNewLink(convertTiktok(value));
      break;
    case "bsky"
      setNewLink(convertBluesky(value));
      break;
    case "instagram":
      setNewLink(convertInstagram(value));
      break;
    case "youtube":
      break;
    case "reddit":
      break;
    default:
      return;
      break;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector('input[name="converter"]')
    .addEventListener("input", (e) => {
      const value = e.target.value;
      onInput(value);
    });
});
