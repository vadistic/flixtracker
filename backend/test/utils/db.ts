import execa from 'execa'

import { PrismaService } from '../../src/module/prisma/prisma.service'

export const databaseDrop = async (prisma: PrismaService) => {
  try {
    await prisma.$queryRaw(`DROP SCHEMA IF EXISTS ${prisma.$SCHEMA} CASCADE;`)
    await prisma.$queryRaw(`CREATE SCHEMA ${prisma.$SCHEMA};`)
  } catch (e) {
    console.error(e)
    throw new Error('drop error')
  }
}

export const prismaGenerate = async (prisma: PrismaService) => {
  const { stderr, stdout, exitCode } = await execa('yarn', ['prisma', 'generate'], {
    extendEnv: true,
    env: { DATABASE_URL: prisma.$URL },
  })

  if (exitCode || stderr) {
    console.error(stderr ?? stdout)
    throw new Error('generate error')
  }
}

export const prismaMigrateSave = async (prisma: PrismaService) => {
  const MIGRATION_NAME = 'test'

  const { stderr, stdout, exitCode } = await execa(
    'yarn',
    ['prisma', 'migrate', 'save', '--create-db', '--name', MIGRATION_NAME, '--experimental'],
    {
      extendEnv: true,
      env: { DATABASE_URL: prisma.$URL },
    },
  )

  if (exitCode || stderr) {
    console.error(stderr ?? stdout)
    throw new Error('migrate save error')
  }
}

export const prismaMigrateUp = async (prisma: PrismaService) => {
  const { stderr, stdout, exitCode } = await execa(
    'yarn',
    ['prisma', 'migrate', 'up', '--experimental'],
    {
      extendEnv: true,
      env: { DATABASE_URL: prisma.$URL },
    },
  )

  if (exitCode || stderr) {
    console.error(stderr ?? stdout)
    throw new Error('migrate save error')
  }
}
