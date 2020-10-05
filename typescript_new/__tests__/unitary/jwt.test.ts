import JWTUtil from '../../util/JWTUtil';

describe('Json web token unitary tests', () => {
  let token = '';

  test('A jwt must be received', () => {
    const tokenToTest = JWTUtil.createToken(1);
    token = tokenToTest;

    expect(token).not.toBe(String);
  });

  test('The token must be valid', () => {
    const result = JWTUtil.isTokenValid(token);

    expect(result).toBe(true);
  });
});
