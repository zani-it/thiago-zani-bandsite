// Select the container element
const container = document.querySelector('.shows-container');

// Define the show data
const shows = [
  { date: 'Mon Dec 17 2018', venue: 'Ronald Lane', location: 'San Francisco, CA' },
  { date: 'Tue Jul 18 2019', venue: 'Pier 3 East', location: 'San Francisco, CA' },
  { date: 'Fri May 10 2019', venue: 'The Warfield', location: 'San Francisco, CA' },
  { date: 'Sat Dec 08 2018', venue: 'The Fillmore', location: 'San Francisco, CA' },
  { date: 'Wed Aug 11 2019', venue: 'Summer Amphitheater', location: 'San Francisco, CA' },
  { date: 'Fri Aug 12 2019', venue: 'Preservation Hall', location: 'San Francisco, CA' },
];

// Define a function to create a single show element
function createShowElement(show) {
  const showElement = document.createElement('div');
  showElement.classList.add('show');

  const dateElement = document.createElement('div');
  dateElement.classList.add('show-date');
  dateElement.textContent = show.date;
  showElement.appendChild(dateElement);

  const venueElement = document.createElement('div');
  venueElement.classList.add('show-venue');
  venueElement.textContent = show.venue;
  showElement.appendChild(venueElement);

  const locationElement = document.createElement('div');
  locationElement.classList.add('show-location');
  locationElement.textContent = show.location;
  showElement.appendChild(locationElement);

  const buttonElement = document.createElement('button');
  buttonElement.classList.add('button--grid');
  buttonElement.textContent = 'BUY TICKETS';
  showElement.appendChild(buttonElement);

  return showElement;

}


// Define a function to create the show grid
function createShowGrid() {
  const gridElement = document.createElement('div');
  gridElement.classList.add('show-grid');

  const dateColumnElement = document.createElement('div');
  dateColumnElement.classList.add('show-column');
  const dateColumnTitle = document.createElement('h2');
  dateColumnTitle.classList.add('show-column-title');
  dateColumnTitle.textContent = 'Date';
  dateColumnElement.appendChild(dateColumnTitle);
  gridElement.appendChild(dateColumnElement);

  const venueColumnElement = document.createElement('div');
  venueColumnElement.classList.add('show-column');
  const venueColumnTitle = document.createElement('h2');
  venueColumnTitle.classList.add('show-column-title');
  venueColumnTitle.textContent = 'Venue';
  venueColumnElement.appendChild(venueColumnTitle);
  gridElement.appendChild(venueColumnElement);

  const locationColumnElement = document.createElement('div');
  locationColumnElement.classList.add('show-column');
  const locationColumnTitle = document.createElement('h2');
  locationColumnTitle.classList.add('show-column-title');
  locationColumnTitle.textContent = 'Location';
  locationColumnElement.appendChild(locationColumnTitle);
  gridElement.appendChild(locationColumnElement);

  // Add a new column for the buttons
  const buttonColumnElement = document.createElement('div');
  buttonColumnElement.classList.add('show-column');
  const buttonColumnTitle = document.createElement('h2');
  buttonColumnTitle.classList.add('show-column-title-ticket');
  buttonColumnTitle.textContent = '.';
  buttonColumnElement.appendChild(buttonColumnTitle);
  gridElement.appendChild(buttonColumnElement);

  // Add the shows to the grid
  for (let i = 0; i < shows.length; i++) {
    const show = shows[i];
    const showElement = createShowElement(show);
    const dateElement = showElement.querySelector('.show-date');
    const venueElement = showElement.querySelector('.show-venue');
    const locationElement = showElement.querySelector('.show-location');
    const buttonElement = showElement.querySelector('.button--grid');
  

    dateColumnElement.appendChild(dateElement);
    venueColumnElement.appendChild(venueElement);
    locationColumnElement.appendChild(locationElement);
    buttonColumnElement.appendChild(buttonElement);

    if ((i + 1) < shows.length) {
      const rowDivider = document.createElement('div');
      rowDivider.classList.add('row-divider');
      dateColumnElement.appendChild(rowDivider.cloneNode(true));
      venueColumnElement.appendChild(rowDivider.cloneNode(true));
      locationColumnElement.appendChild(rowDivider.cloneNode(true));
      buttonColumnElement.appendChild(rowDivider.cloneNode(true));
    }
  }

  return gridElement;
}
  //Define a function to add event listeners to the grid
  function addEventListenersToGrid() {
    // Add event listeners to each column header
    const columnHeaders = document.querySelectorAll(".show-column-title");
    columnHeaders.forEach(function (header) {});
  
    // Add event listeners to each row
    const rows = document.querySelectorAll(".show");
    rows.forEach(function (row) {});
  }
  
  // Wait for the DOM to be ready
  document.addEventListener("DOMContentLoaded", function () {
    const showGrid = createShowGrid();
    container.appendChild(showGrid);
    addEventListenersToGrid();
  });
    