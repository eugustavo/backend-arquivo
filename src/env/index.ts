import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3000),
  FB_HOST: z.string().default('192.168.16.158'),
  FB_PORT: z.coerce.number().default(3050),
  FB_DATABASE: z.string().default('/Dados/base-oficial/nQuestor.FDB'),
  FB_USER: z.string().default('sysdba'),
  FB_PASSWORD: z.string().default('dbaarq16'),
  FB_LOWERCASE_KEYS: z.boolean().default(false),
  FB_RETRY_CONNECTION_INTERVAL: z.coerce.number().default(1000),
  FB_PAGE_SIZE: z.coerce.number().default(4096)
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.log('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
