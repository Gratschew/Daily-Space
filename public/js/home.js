$(window).scroll(function(){
  var scroll = $(window).scrollTop();
  $(document.getElementById("stars")).css({
    width: (100 + scroll/10) + "%",
    height: (100 + scroll/10) + "%"
  });
})

const setData = data => {
  // replace loader with original elements
  document.getElementById("wrapper-title").innerHTML= data["title"];
  document.getElementById('spaceContent').innerHTML = 
  `<img src="" alt="Image of space" id=wrapper-image> <p id = "wrapper-explanation"></p>`;
  document.getElementById("wrapper-explanation").innerHTML= data["explanation"];
  if(data["media_type"] === "image"){
    let element = document.getElementById("wrapper-image");
    let imageElement = document.createElement('img');
    imageElement.src = data["url"];
    imageElement.id = ("wrapper-image");
    element.parentNode.replaceChild(imageElement, element);
  }
  else{
    let imgElement = document.getElementById("wrapper-image")
    let videoElement = document.createElement('iframe');
    
    videoElement.allowFullscreen = true;
    videoElement.src = data["url"];
    videoElement.id = "wrapper-image";
    imgElement.parentNode.replaceChild(videoElement, imgElement);

  }
};

/**
 * Asynchronously fetch JSON from the given url. (GET)
 *
 * Uses fetch to get JSON from the backend and returns the parsed
 * JSON back.
 *
 * Remember that an async function always returns a Promise which
 * needs to be awaited or handled with then() as in:
 *
 *   const json = await getJSON("/api/users");
 *
 *   -- OR --
 *
 *   getJSON("/api/users").then(json => {
 *     // Do something with the json
 *   })
 *
 * @param {string} url resource url on the server
 * @returns {Promise<*>} promise that resolves to the parsed JSON
 */
 const getJSON = async url => {
  const response = await fetch(url, { method: 'GET', headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('Network response was not OK');
  return await response.json();
};

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

(async() => {
  // set loader on page
  let loader = `<div id="loading"></div>`;
  document.getElementById('wrapper-title').innerHTML = "";
  document.getElementById('spaceContent').innerHTML = loader;
  try{
  const data = await getJSON('/api/spacephoto');
  setData(data);
  } catch(e) {
    document.getElementById('spaceContent').innerHTML = 
    `<p id = "wrapper-explanation"></p>`;
    document.getElementById("wrapper-explanation").innerHTML= 'Data not found! Try again later.';
  }

  var today = new Date();
  let dateToday = formatDate(today);
  let datepicker = document.getElementById("datepicker");
  datepicker.max = dateToday;
  datepicker.value = dateToday;
  datepicker.addEventListener('change', async function() {
    var input = this.value;
    var dateEntered = new Date(input);
    if(isValidDate(dateEntered)){
      if(today >= dateEntered ){

      // set loader on page
      let loader = `<div id="loading"></div>`;
      document.getElementById('wrapper-title').innerHTML = "";
      document.getElementById('spaceContent').innerHTML = loader;
      formattedDate = formatDate(dateEntered);
      try{
      const dataForDate = await getJSON('/api/spacephoto/'+formattedDate);
      setData(dataForDate);
    } catch(e) {
      document.getElementById('spaceContent').innerHTML = 
      `<p id = "wrapper-explanation"></p>`;
      document.getElementById("wrapper-explanation").innerHTML= 'Data not found! Try again later.';
    }
    
    }
    }
});
  })();