import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(watts: number) {
    console.log(`Power supplied: ${watts} watts`);
    return 'Power supplied';
  }
}
