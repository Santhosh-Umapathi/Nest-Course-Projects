import { IsString } from 'class-validator';

// Data Transfer Objects are used to validate the data that is sent to the server
export class CreateMessageDto {
  @IsString()
  content: string;
}
