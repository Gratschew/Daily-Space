const { renderPublic } = require('./utils/render');
const responseUtils = require('./utils/responseUtils');
const fetch = require('node-fetch');



/**
 * Does the url have an ID component as its last part? (e.g. /api/users/dsf7844e)
 *
 * @param {string} url filePath
 * @param {string} prefix prefix
 * @returns {boolean} true if ID component as last part, false otherwise
 */
 const matchHistoryQuery = (url, prefix) => {
  const regex = new RegExp(`^(/api)?/${prefix}/.*$`);
  return regex.test(url);
};

const handleRequest = async(request, response) => {
  const { url, method, headers } = request;
  const filePath = new URL(url, `http://${headers.host}`).pathname;

  // serve static files from public/ and return immediately
  if (method.toUpperCase() === 'GET' && !filePath.startsWith('/api')) {
    let fileName = filePath === '/' || filePath === '' ? 'home.html' : filePath;
    if (filePath === '/home'){
      fileName = 'home.html';
    }
    if (filePath === '/statistics'){
      fileName = 'statistics.html';
    }
    if (filePath === '/about'){
      fileName = 'about.html';
    }
    if (filePath ==='/favicon.ico'){
      console.log('hep');
      fileName = 'favicon.ico'
    }
    return renderPublic(fileName, response);
  }

  if (matchHistoryQuery(filePath, 'spacephoto')){
    const splittedFilepath = filePath.split('/');
    const date = splittedFilepath[splittedFilepath.length - 1];
    let queryUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
    let apiKey = '5LBVoGZGApHgNBSTlReY2jeXSyTPrp3AT1Ipszn6';
    let query = queryUrl + apiKey +'&date='+ date;

    fetch(query)
    .then(data => {
      if(data.ok){
      return data.json();
      }
      else{
        throw 'error';
      }})
    .then((json) =>{
      responseUtils.sendJson(response, json, 200);
    })
    .catch(e => responseUtils.badRequest(response, 'error'));
    
  }

  if (filePath === '/api/spacephoto' && method.toUpperCase() === 'GET') {
    let queryUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
    let apiKey = '5LBVoGZGApHgNBSTlReY2jeXSyTPrp3AT1Ipszn6';
    let query = queryUrl + apiKey

    fetch(query)
    .then(data => {
      if(data.ok){
      return data.json();
      }
      else{
        throw 'error';
      }})
    .then((json) =>{
      responseUtils.sendJson(response, json, 200);
    })
    .catch(e => responseUtils.badRequest(response, 'error'));
 
}

  if (filePath === '/api/spacestatistics' && method.toUpperCase() === 'GET') {
    let query = 'http://api.open-notify.org/astros.json'
    fetch(query)
    .then(data => {
      if(data.ok){
      return data.json();
      }
      else{
        throw 'error';}})
    .then((json) =>{
      responseUtils.sendJson(response, json, 200);
    })
    .catch(e => responseUtils.badRequest(response, 'error'));
  }
};



module.exports = { handleRequest };