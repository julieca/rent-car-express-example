const ResponseFactory = require('../helpers/response');

test('ok', () => {
  const payload = { name: "Julieca" }
  const response = new ResponseFactory('ok', payload);
  expect(response).toEqual(
    expect.objectContaining(
      {
        status: 200,
        payload: {
          success: true,
          data: payload
        }
      }
    )
  );
});



