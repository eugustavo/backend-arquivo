import { env } from './../env';

export const options = {
  host: env.FB_HOST,
  port: env.FB_HOST,
  database: env.FB_DATABASE,
  user: env.FB_USER,
  password: env.FB_PASSWORD,
  lowercase_keys: env.FB_LOWERCASE_KEYS,
  retryConnectionInterval: env.FB_RETRY_CONNECTION_INTERVAL,
  pageSize: env.FB_PAGE_SIZE
}