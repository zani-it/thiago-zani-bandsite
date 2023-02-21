// HTML STARTING TAG (QUERY SELECTOR)
const container = document.querySelector('.shows-container');

// Define the show data
const shows = [
  { date: 'Mon Sept 06 2021', venue: 'Ronald Lane', location: 'San Francisco, CA' },
  { date: 'Tue Sept 21 2021', venue: 'Pier 3 East', location: 'San Francisco, CA' },
  { date: 'Fri Oct 15 2021', venue: 'View Lounge', location: 'San Francisco, CA' },
  { date: 'Sat nov 06 2021', venue: 'Hyatt agency', location: 'San Francisco, CA' },
  { date: 'Fri Nov 26 2021', venue: 'Moscow Center', location: 'San Francisco, CA' },
  { date: 'Wed Dec 15 2021', venue: 'Press club', location: 'San Francisco, CA' },
];

// 
function createShowElement(show) {

  const showElement = document.createElement('div');
  showElement.classList.add('show');

  const buttonElement = document.createElement('button');
  buttonElement.classList.add('button--grid');
  buttonElement.textContent = 'BUY TICKETS';
  showElement.appendChild(buttonElement);

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

  return showElement;

}

// Define a function to create desktop the show grid view

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
    const buttonElement = showElement.querySelector('.button--grid');
    const dateElement = showElement.querySelector('.show-date');
    const venueElement = showElement.querySelector('.show-venue');
    const locationElement = showElement.querySelector('.show-location');

    buttonColumnElement.appendChild(buttonElement);
    dateColumnElement.appendChild(dateElement);
    venueColumnElement.appendChild(venueElement);
    locationColumnElement.appendChild(locationElement);


    if ((i + 1) < shows.length) {

      const rowDivider = document.createElement('div');
      rowDivider.classList.add('row-divider');
      dateColumnElement.appendChild(rowDivider.cloneNode(true));
      venueColumnElement.appendChild(rowDivider.cloneNode(true));
      locationColumnElement.appendChild(rowDivider.cloneNode(true));

    }
  }

  //hover-in
  gridElement.addEventListener('mouseover', (event) => {
    // get the index of the child element that was hovered over
    const index = Array.from(event.target.parentNode.children).indexOf(event.target);

    // find all elements with the same index in their parent element (i.e., same row)
    const rowElements = document.querySelectorAll(`.show-grid > :first-child  > *:not(.show-column-title):not(.button-class):nth-child(${index + 1})`);

    // add class to trigger hover effect for each row element
    rowElements.forEach((element) => {
      element.classList.add('hover');
    });
  });
  //hover-out
  gridElement.addEventListener('mouseout', (event) => {
    // get the index of the child element that was hovered over
    const index = Array.from(event.target.parentNode.children).indexOf(event.target);

    // find all elements with the same index in their parent element (i.e., same row)
    const rowElements = document.querySelectorAll(`.show-grid > :first-child  > *:not(.show-column-title):not(.button-class):nth-child(${index + 1})`);

    // remove class to remove hover effect for each row element
    rowElements.forEach((element) => {
      element.classList.remove('hover');
    });
  });

  gridElement.addEventListener('click', (event) => {
    // check if the target element is a child element of the grid row
    if (event.target.closest('.show-grid' + (event.target.classList.contains('clicked') ? '.clicked' : '') + ' > *')) {
      // check if any element in the grid has the class 'clicked'
      const isAnyClicked = document.querySelector('.show-grid .clicked');
      if (isAnyClicked) {
        // remove the class from all elements in the grid
        document.querySelectorAll('.show-grid .clicked').forEach((element) => {
          element.classList.remove('clicked');
        });

      }

      // get the index of the child element that was clicked within its own row
      const index = Array.from(event.target.parentElement.children).indexOf(event.target);

      // find all elements with the same index in their parent element (i.e., same row)
      const rowElements = document.querySelectorAll(`.show-grid > :first-child > *:not(.show-column-title):not(.button-class):nth-child(${index + 1})`);

      // toggle the 'clicked' class for each row element
      rowElements.forEach((element) => {
        element.classList.toggle('clicked');
      });
    }
  });

  return gridElement;


}


//Define a function to add event listeners to the grid
function addEventListenersToGrid() {
  // Add event listeners to each column header
  const columnHeaders = document.querySelectorAll(".show-column-title");
  columnHeaders.forEach(function (header) { });

  // Add event listeners to each row
  const rows = document.querySelectorAll(".show");
  rows.forEach(function (row) { });
}


const mediaQuery = window.matchMedia('(max-width: 767px)');

// Create a function to handle the media query change

function handleTabletScreenChange(e) {
  console.log(e)
  // If the media query is active, show the mobile elements and remove the desktop elements
  if (e.matches) {
    // Remove the desktop elements
    const deskShows = container.querySelectorAll('.show-grid');
    for (let i = 0; i < deskShows.length; i++) {
      const deskShow = deskShows[i];
      container.removeChild(deskShow);
    }
    // Add the mobile elements
    for (let i = 0; i < shows.length; i++) {
      const show = shows[i];
      const showElement = createMobileElement(show);
      container.appendChild(showElement);
    }
  } else {

    // If the media query is not active, remove the mobile elements and show the desktop elements
    // Remove the mobile elements
    const mobileShows = container.querySelectorAll('.show-mobile');
    for (let i = 0; i < mobileShows.length; i++) {
      const mobileShow = mobileShows[i];
      container.removeChild(mobileShow);
    }

    // Add the desktop elements

    const showGrid = createShowGrid();
    container.appendChild(showGrid);

  }
}

// Add the event listener to the media query

mediaQuery.addEventListener('change', handleTabletScreenChange);

// Run the function once to check the initial state of the media query

handleTabletScreenChange(mediaQuery);

//creating the mobile view

function createMobileElement(show) {

  const showElement = document.createElement('div');
  showElement.classList.add('show-mobile');

  const dateColumnTitle = document.createElement('h2');
  dateColumnTitle.classList.add('show-column-title');
  dateColumnTitle.textContent = 'Date';

  const dateElement = document.createElement('div');
  dateElement.classList.add('show-date');
  dateElement.textContent = show.date;

  showElement.appendChild(dateColumnTitle);
  showElement.appendChild(dateElement);

  const venueColumnTitle = document.createElement('h2');
  venueColumnTitle.classList.add('show-column-title');
  venueColumnTitle.textContent = 'Venue';

  const venueElement = document.createElement('div');
  venueElement.classList.add('show-venue');
  const venueHeading = document.createElement('h2');
  venueHeading.textContent = 'Venue';
  venueElement.appendChild(venueHeading);
  venueElement.textContent = show.venue;

  showElement.appendChild(venueColumnTitle);
  showElement.appendChild(venueElement);

  const locationColumnTitle = document.createElement('h2');
  locationColumnTitle.classList.add('show-column-title');
  locationColumnTitle.textContent = 'Location';

  const locationElement = document.createElement('div');
  locationElement.classList.add('show-location');
  const locationHeading = document.createElement('h2');
  locationHeading.textContent = 'Location';
  locationElement.appendChild(locationHeading);
  locationElement.textContent = show.location;

  showElement.appendChild(locationColumnTitle);
  showElement.appendChild(locationElement);

  const buttonElement = document.createElement('button');
  buttonElement.classList.add('button--grid');
  buttonElement.textContent = 'BUY TICKETS';
  showElement.appendChild(buttonElement);

  const dividerElement = document.createElement('div');
  dividerElement.classList.add('show-divider');
  showElement.appendChild(dividerElement);


  return showElement;


}