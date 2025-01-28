import {} from '@prisma/client'

export const db = globalThis.prisma || new PrismaClient