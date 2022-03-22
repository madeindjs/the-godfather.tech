// @ts-check

import { getConfigKey } from "../utils/config";

export async function getOauthQueryParams() {
  const oauthQueryParams = new URLSearchParams();
  oauthQueryParams.set("client_id", await getConfigKey("GITHUB_CLIENT_ID"));
  oauthQueryParams.set("redirect_uri", await getConfigKey("GITHUB_CLIENT_REDIRECT_URI"));
  oauthQueryParams.set("scope", ["read:user", "user:email"].join(" "));
  return oauthQueryParams;
}
