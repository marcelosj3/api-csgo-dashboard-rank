import { InvalidUrlError } from "../../errors";

/**
 * This function will validate any url received to the patterns that we need,
 * It will receive the url coming from the request and will compare with the
 * baseUrl of the platform (example: https://csgostats.gg) along with the endpoint
 * (example: /player/)it will also check for any extra endpoints and/or query params
 * and remove them, if the formatted final url passes the regex match it will return
 * the id and the formatted url, if not, it will raise an invalid url error.
 *
 * The base url must be a string with https://domain-name, and the endpointUrl must
 * be a string with /endpoint/.
 *
 * @param url
 * @param baseUrl
 * @param endpointUrl
 * @returns id, url
 */
export const validateAndReturnUrlAndId = (
  url: string,
  baseUrl: string,
  endpointUrl: string
): string[] => {
  const fullUrl: string = baseUrl + endpointUrl;
  let formattedUrl: string = url;
  let id: string;

  const https: string = "https://";
  const startsWithHttps = url.startsWith(https);

  if (!startsWithHttps) formattedUrl = `${https}${url}`;

  const endsWithNumber = formattedUrl.match(/[0-9]+$/g);

  if (endsWithNumber) {
    id = endsWithNumber[0];
  } else {
    const idFromUrl = formattedUrl.replace(fullUrl, "").split(/[/#]/)[0];
    formattedUrl = formattedUrl.split(idFromUrl)[0] + idFromUrl;
    id = idFromUrl;
  }

  const baseUrlRegex = new RegExp(`^(${fullUrl})[0-9]+$`, "g");
  if (!formattedUrl.match(baseUrlRegex)) throw new InvalidUrlError();

  return [id, formattedUrl];
};
