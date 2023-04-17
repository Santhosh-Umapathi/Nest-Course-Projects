import { Expose } from 'class-transformer';

//Response DTO
export class UserDto {
  @Expose() //Expose decorator is used to expose the property to the response
  id: number;
  @Expose()
  email: string;
}
