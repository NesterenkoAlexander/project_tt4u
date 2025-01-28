import { PrismaClient } from '@prisma/client'

export const db = globalThis.prisma || new PrismaClient

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}

// globalThis.prisma: Эта глобальная переменная обеспечивает переиспользование 
// экземпляра Prisma-клиента при «горячих» перезагрузках во время разработки. 
// Без неё при каждой перезагрузке приложения создавался бы новый экземпляр Prisma-клиента, 
// что потенциально могло бы приводить к проблемам с подключениями.