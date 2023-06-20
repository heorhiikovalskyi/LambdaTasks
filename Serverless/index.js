export const hello = async (event, context, callback) => {
  const { name } = event.queryStringParameters;
  const response = `Hello, ${name}`;
  return response;
};
