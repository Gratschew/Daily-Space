

/**
 * Writes application/json as content type and payload to the response
 * 
 * @param {http.ServerResponse} response server's response
 * @param {object} payload data to write
 * @param {string} code default 200
 * @returns exiting function
 */
const sendJson = (response, payload, code = 200) => {
  response.writeHead(code, { 'Content-Type': 'application/json' });
  return response.end(JSON.stringify(payload));
};



/**
 * writes error message and statuscode 400 to response
 * 
 * @param {http.ServerResponse} response server's response 
 * @param {string} errorMsg error message
 * @returns exiting function
 */
 const badRequest = (response, errorMsg) => {
  if (errorMsg) return sendJson(response, { error: errorMsg }, 400);
  response.statusCode = 400;
  return response.end();
};


module.exports = {
  sendJson,
  badRequest
};