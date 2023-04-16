import { FastifyInstance } from 'fastify'
import { helloWorld } from '../controllers/hello-world'

export async function appRoutes(app: FastifyInstance) {
  app.get('/', helloWorld)
}
