// @ts-check

import { getConfigKey } from "../utils/config";
import { PROJECT_URL } from "./project";

// https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow
export const REDIRECT_URI = `${PROJECT_URL}/github-logged`;

export async function getOauthQueryParams() {
  const oauthQueryParams = new URLSearchParams();
  oauthQueryParams.set("client_id", await getConfigKey("GITHUB_CLIENT_ID"));
  oauthQueryParams.set("redirect_uri", REDIRECT_URI);
  return oauthQueryParams;
}
