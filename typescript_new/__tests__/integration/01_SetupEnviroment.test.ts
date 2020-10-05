import { createConnection } from 'typeorm';

describe('Setting up the environment to start unit tests', () => {
  test('Synchronizing the models and the database', async () => {
    const connection = await createConnection();
    let result: boolean; 

    console.log(process.env.NODE_ENV);

    try {
      await connection.synchronize(true);
      result = true;
    }
    catch(err) {
      result = false;
    }
    finally {
      expect(result).toBe(true);
    }
  });
});
