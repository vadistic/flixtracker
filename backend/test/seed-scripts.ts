import { NestFactory } from '@nestjs/core'

import { UtilModule } from './utils/util.module'

const main = async () => {
  const app = await NestFactory.create(UtilModule, { bodyParser: true })

  await app.init()
  await app.close()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
