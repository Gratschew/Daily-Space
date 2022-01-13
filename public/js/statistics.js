$(window).scroll(function(){
  var scroll = $(window).scrollTop();
  $(document.getElementById("stars")).css({
    width: (100 + scroll/10) + "%",
    height: (100 + scroll/10) + "%"
  });
})

const setData = data => {
  let table = document.querySelector('tbody');
  let statisticscaption = document.getElementById('statisticscaption');

  // poeple => array for all the people and their crafts
  // people.length (amount of people in space)
  let people = data["people"];
  statisticscaption.innerHTML = `There are currently ${people.length} people in space!`

  people.forEach(function (item) {
    let name = item.name;
    let craft = item.craft;
    let template = 
    `<tr>
    <td>${name}</td>
    <td>${craft}</td>
  </tr>
  `;
  table.innerHTML += template;
  });
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

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("statisticstable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

(async() => {
  try{
  const data = await getJSON('/api/spacestatistics');
  setData(data);
  }catch(e){
    document.getElementById('statisticscaption').innerHTML = 'Data not found! Try again later.';
    let table = document.getElementById('statisticstable');
    table.remove();
  }

  thName = document.getElementById('thName');
  thCraft = document.getElementById('thCraft');

  // sort by name
  thName.addEventListener('onclick',  sortTable(0));

  // sort by craft
  thCraft.addEventListener('onclick',  sortTable(1));
  
})();