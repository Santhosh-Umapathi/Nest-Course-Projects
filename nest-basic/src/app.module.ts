import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

// Create a Nest module
@Module({
  controllers: [AppController],
})
export class AppModule {}
