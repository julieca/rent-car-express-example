export default {
  ok: [200],
  created: [201],
  badRequest: [400],
  unauthorized: [401],
  forbidden: [403, "You do not have rights to access this resource."],
  notFound: [404, 'Resource not found.'],
  err: [500],
  missingParam: [500, 'Parameter is missing']
};