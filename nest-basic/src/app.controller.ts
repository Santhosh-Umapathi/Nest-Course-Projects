import { Controller, Get } from "@nestjs/common";

//------------------------------------------------------------------
//MARK: - Controller:  Handles routes for the application
//------------------------------------------------------------------

// Create a Nest controller
@Controller("/app") // Define the route for the controller
export class AppController {
  // Define a GET route
  @Get("/hello") // Define the route for the method
  getHello() {
    return "Hello World!";
  }

  @Get("/bye") // Define the route for the method
  getGoodbye() {
    return "Goodbye there!";
  }
}
