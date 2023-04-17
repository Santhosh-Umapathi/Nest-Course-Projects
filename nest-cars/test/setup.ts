import { rm } from 'fs/promises';
import { join } from 'path';

//Global Before Each for all e2e tests
global.beforeEach(async () => {
  try {
    //Remove the test database before each test
    await rm(join(__dirname, '..', 'testDb.sqlite'), { force: true });
  } catch (error) {}
});
