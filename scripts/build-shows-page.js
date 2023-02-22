/// https://project-1-api.herokuapp.com/showdates?api_key=%3Cfa33b2ca-0688-4357-bb7c-260f60f456ef%3E

/// https://project-1-api.herokuapp.com/showdates?api_key=<fa33b2ca-0688-4357-bb7c-260f60f456ef>
const apiAddressShows = 'https://project-1-api.herokuapp.com/showdates?api_key=';
const apiKey = 'd17ee7f2-34f4-4bae-b206-8af2fd2e6731';
const container = document.querySelector('.shows-container');


// Define show data
async function createShowElements() {
  const response = await fetch(`${apiAddressShows}${apiKey}`);
  const showsData = await response.json();


  console.log(showsData);

  for (const show of showsData) { 
    const showElement = document.createElement('div');
    showElement.classList.add('show');
    container.appendChild(showElement);
//
    const dateWrapperElement = document.createElement('div');
    dateWrapperElement.classList.add('show-date');
    showElement.appendChild(dateWrapperElement);
  
    const dateElementTitle = document.createElement('h2');
    dateElementTitle.classList.add('__title--date');
    dateElementTitle.textContent = 'Date';
    dateWrapperElement.appendChild(dateElementTitle);
  
    const dateElement = document.createElement('div');
    dateElement.textContent = new Date(show.date).toLocaleDateString();
    dateWrapperElement.appendChild(dateElement);
//
    const venueWrapperElement = document.createElement('div');
    venueWrapperElement.classList.add('show-venue');
    showElement.appendChild(venueWrapperElement);

    const venueElementTitle = document.createElement('h2');
    venueElementTitle.classList.add('__title--venue');
    venueElementTitle.textContent = 'Venue';
    venueWrapperElement.appendChild(venueElementTitle);

    const venueElement = document.createElement('div');
    venueElement.textContent = show.place;
    showElement.appendChild(venueElement);
//  
    const venueColumnTitle = document.createElement('h2');
    venueColumnTitle.classList.add('show-column-title');
    venueColumnTitle.textContent = 'Venue';

    const locationElement = document.createElement('div');
    locationElement.classList.add('show-location');
    locationElement.textContent = show.location;
    showElement.appendChild(locationElement);


    const buttonElement = document.createElement('button');
    buttonElement.classList.add('button--grid');
    buttonElement.textContent = 'BUY TICKETS';
    showElement.appendChild(buttonElement);
    

    const dividerElement = document.createElement('div');
    dividerElement.classList.add('show-divider');
    showElement.appendChild(dividerElement);

    
  }
}

createShowElements();


// // Define a function to create desktop show grid view
// function createShowGrid() {

//   const gridElement = document.createElement('div');
//   gridElement.classList.add('show-grid');

//   const dateColumnElement = document.createElement('div');
//   dateColumnElement.classList.add('show-column');
//   const dateColumnTitle = document.createElement('h2');
//   dateColumnTitle.classList.add('show-column-title');
//   dateColumnTitle.textContent = 'Date';
//   dateColumnElement.appendChild(dateColumnTitle);
//   gridElement.appendChild(dateColumnElement);

//   const venueColumnElement = document.createElement('div');
//   venueColumnElement.classList.add('show-column');
//   const venueColumnTitle = document.createElement('h2');
//   venueColumnTitle.classList.add('show-column-title');
//   venueColumnTitle.textContent = 'Venue';
//   venueColumnElement.appendChild(venueColumnTitle);
//   gridElement.appendChild(venueColumnElement);

//   const locationColumnElement = document.createElement('div');
//   locationColumnElement.classList.add('show-column');
//   const locationColumnTitle = document.createElement('h2');
//   locationColumnTitle.classList.add('show-column-title');
//   locationColumnTitle.textContent = 'Location';
//   locationColumnElement.appendChild(locationColumnTitle);
//   gridElement.appendChild(locationColumnElement);

//   const buttonColumnElement = document.createElement('div');
//   buttonColumnElement.classList.add('show-column');
//   const buttonColumnTitle = document.createElement('h2');
//   buttonColumnTitle.classList.add('show-column-title-ticket');
//   buttonColumnTitle.textContent = '.';
//   buttonColumnElement.appendChild(buttonColumnTitle);
//   gridElement.appendChild(buttonColumnElement);

//   // Add shows to grid
//   for (let i = 0; i < shows.length; i++) {
//     const show = shows[i];
//     const showElement = createShowElement(show);
//     const buttonElement = showElement.querySelector('.button--grid');
//     const dateElement = showElement.querySelector('.show-date');
//     const venueElement = showElement.querySelector('.show-venue');
//     const locationElement = showElement.querySelector('.show-location');

//     buttonColumnElement.appendChild(buttonElement);
//     dateColumnElement.appendChild(dateElement);
//     venueColumnElement.appendChild(venueElement);
//     locationColumnElement.appendChild(locationElement);


//     if ((i + 1) < shows.length) {

//       const rowDivider = document.createElement('div');
//       rowDivider.classList.add('row-divider');
//       dateColumnElement.appendChild(rowDivider.cloneNode(true));
//       venueColumnElement.appendChild(rowDivider.cloneNode(true));
//       locationColumnElement.appendChild(rowDivider.cloneNode(true));

//     }
//   }

//   //hover-in
//   gridElement.addEventListener('mouseover', (event) => {
//     // get index of child element that was hovered over
//     const index = Array.from(event.target.parentNode.children).indexOf(event.target);

//     // find all elements with same index in their parent element (i.e., same row)
//     const rowElements = document.querySelectorAll(`.show-grid > :first-child  > *:not(.show-column-title):not(.button-class):nth-child(${index + 1})`);

//     // add class to trigger hover effect for each row element
//     rowElements.forEach((element) => {
//       element.classList.add('hover');
//     });
//   });
//   //hover-out
//   gridElement.addEventListener('mouseout', (event) => {
//     // get index of child element that was hovered over
//     const index = Array.from(event.target.parentNode.children).indexOf(event.target);

//     // find all elements with same index in their parent element (i.e., same row)
//     const rowElements = document.querySelectorAll(`.show-grid > :first-child  > *:not(.show-column-title):not(.button-class):nth-child(${index + 1})`);

//     // remove class to remove hover effect for each row element
//     rowElements.forEach((element) => {
//       element.classList.remove('hover');
//     });
//   });

//   gridElement.addEventListener('click', (event) => {
//     // check if target element is a child element of grid row
//     if (event.target.closest('.show-grid' + (event.target.classList.contains('clicked') ? '.clicked' : '') + ' > *')) {
//       // check if any element in grid has class 'clicked'
//       const isAnyClicked = document.querySelector('.show-grid .clicked');
//       if (isAnyClicked) {
//         // remove class from all elements in grid
//         document.querySelectorAll('.show-grid .clicked').forEach((element) => {
//           element.classList.remove('clicked');
//         });

//       }

//       // get index of child element that was clicked within its own row
//       const index = Array.from(event.target.parentElement.children).indexOf(event.target);

//       // find all elements with same index in their parent element (i.e., same row)
//       const rowElements = document.querySelectorAll(`.show-grid > :first-child > *:not(.show-column-title):not(.button-class):nth-child(${index + 1})`);

//       // toggle 'clicked' class for each row element
//       rowElements.forEach((element) => {
//         element.classList.toggle('clicked');
//       });
//     }
//   });

//   return gridElement;

// }


// //Define a function to add event listeners to grid
// function addEventListenersToGrid() {
//   // Add event listeners to each column header
//   const columnHeaders = document.querySelectorAll(".show-column-title");
//   columnHeaders.forEach(function (header) { });

//   // Add event listeners to each row
//   const rows = document.querySelectorAll(".show");
//   rows.forEach(function (row) { });
// }

// //Media Query start>>>
// const mediaQuery = window.matchMedia('(max-width: 767px)');

// // Create a function to handle media query change

// function handleTabletScreenChange(e) {
//   console.log(e)
//   // If media query is active, show mobile elements and remove desktop elements
//   if (e.matches) {
//     // Remove desktop elements
//     const deskShows = container.querySelectorAll('.show-grid');
//     for (let i = 0; i < deskShows.length; i++) {
//       const deskShow = deskShows[i];
//       container.removeChild(deskShow);
//     }
//     // Add mobile elements
//     for (let i = 0; i < shows.length; i++) {
//       const show = shows[i];
//       const showElement = createMobileElement(show);
//       container.appendChild(showElement);
//     }
//   } else {

//     // If media query is not active, remove mobile elements and show desktop elements
//     // Remove mobile elements
//     const mobileShows = container.querySelectorAll('.show-mobile');
//     for (let i = 0; i < mobileShows.length; i++) {
//       const mobileShow = mobileShows[i];
//       container.removeChild(mobileShow);
//     }

//     // Add desktop elements
//     const showGrid = createShowGrid();
//     container.appendChild(showGrid);

//   }
// }

// // Add event listener to media query
// mediaQuery.addEventListener('change', handleTabletScreenChange);

// // Run function once to check initial state of media query
// handleTabletScreenChange(mediaQuery);

// //creating mobile view
// async function createMobileElement(show) {

//   const showElement = document.createElement('div');
//   showElement.classList.add('show-mobile');

//   const dateColumnTitle = document.createElement('h2');
//   dateColumnTitle.classList.add('show-column-title');
//   dateColumnTitle.textContent = 'Date';

//   const dateElement = document.createElement('div');
//   dateElement.classList.add('show-date');
//   dateElement.textContent = show.date;

//   showElement.appendChild(dateColumnTitle);
//   showElement.appendChild(dateElement);

//   const venueColumnTitle = document.createElement('h2');
//   venueColumnTitle.classList.add('show-column-title');
//   venueColumnTitle.textContent = 'Venue';

//   const venueElement = document.createElement('div');
//   venueElement.classList.add('show-venue');
//   const venueHeading = document.createElement('h2');
//   venueHeading.textContent = 'Venue';
//   venueElement.appendChild(venueHeading);
//   venueElement.textContent = show.venue;

//   showElement.appendChild(venueColumnTitle);
//   showElement.appendChild(venueElement);

//   const locationColumnTitle = document.createElement('h2');
//   locationColumnTitle.classList.add('show-column-title');
//   locationColumnTitle.textContent = 'Location';

//   const locationElement = document.createElement('div');
//   locationElement.classList.add('show-location');
//   const locationHeading = document.createElement('h2');
//   locationHeading.textContent = 'Location';
//   locationElement.appendChild(locationHeading);
//   locationElement.textContent = show.location;

//   showElement.appendChild(locationColumnTitle);
//   showElement.appendChild(locationElement);

//   const buttonElement = document.createElement('button');
//   buttonElement.classList.add('button--grid');
//   buttonElement.textContent = 'BUY TICKETS';
//   showElement.appendChild(buttonElement);

//   const dividerElement = document.createElement('div');
//   dividerElement.classList.add('show-divider');
//   showElement.appendChild(dividerElement);


//   return showElement;


// }