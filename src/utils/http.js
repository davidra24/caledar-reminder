export const get = async (service) => {
  try {
    const options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      }),
    };
    const response = await fetch(service, options).then((response) => response.json())
    return response
  } catch (error) {
    return error;
  }
}