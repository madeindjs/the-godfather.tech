// @ts-check

import { PROJECT_URL } from "./project";

// https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow
export const CLIENT_ID = "1b17efdda3140bf9fa19";
export const REDIRECT_URI = `${PROJECT_URL}/github-logged`;
/**
 * @see https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
 */
export const SCOPES = [];

export const oauthQueryParams = new URLSearchParams();
oauthQueryParams.set("client_id", CLIENT_ID);
oauthQueryParams.set("redirect_uri", REDIRECT_URI);
if (SCOPES) {
  oauthQueryParams.set("scope", SCOPES.join(" "));
}
