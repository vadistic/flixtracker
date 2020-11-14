import { Module } from '@nestjs/common'

import { DemoController } from './demo.controller'
import { DemoResolver } from './demo.resolver'
import { DemoService } from './demo.service'

@Module({
  imports: [],
  controllers: [DemoController],
  providers: [DemoService, DemoResolver],
  exports: [],
})
export class DemoModule {}
