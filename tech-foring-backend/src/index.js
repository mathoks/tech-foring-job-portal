const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    
    const allUsers = await prisma.$queryRaw`SELECT count(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'postgress';`
    console.log(allUsers)
}

main().catch((e) => {
    console.error(e)
}).finally(async () => {
    await prisma.$disconnect()
    process.exit(1)
})