import { FastifyReply, FastifyRequest } from 'fastify'

export async function helloWorld(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(200).send({ message: 'Hello World' })
}
