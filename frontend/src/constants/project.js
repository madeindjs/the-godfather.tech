export const PROJECT_DOMAIN = window.location.hostname;
const PORT = window.location.port ? `:${window.location.port}` : "";
export const PROJECT_URL = `${window.location.protocol}//${PROJECT_DOMAIN}${PORT}`;
export const PROJECT_API_URL = `${PROJECT_URL}/api/v1`;
export const VERSION = "0.0.6-alpha";
