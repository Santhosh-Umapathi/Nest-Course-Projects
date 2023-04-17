import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  isLongitude,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1995)
  @Max(2023)
  year: number;

  @IsNumber()
  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  @IsLongitude()
  lng: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(400000)
  mileage: number;
}
