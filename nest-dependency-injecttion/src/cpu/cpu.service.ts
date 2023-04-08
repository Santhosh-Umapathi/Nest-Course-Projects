import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}

  compute() {
    this.powerService.supplyPower(100);
    console.log('CPU running');
    return 'CPU running';
  }
}
