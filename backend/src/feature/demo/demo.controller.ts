import { Controller, Get, Param } from '@nestjs/common'

import { DemoService } from './demo.service'

@Controller()
export class DemoController {
  constructor(private readonly appService: DemoService) {}

  @Get('hello/:name')
  getHelloName(@Param('name') name: string): string {
    return this.appService.getHelloName(name)
  }
}
