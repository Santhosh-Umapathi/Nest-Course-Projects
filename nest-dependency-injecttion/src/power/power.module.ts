import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  //To share services with other modules, we need to export them.
  exports: [PowerService],
})
export class PowerModule {}
