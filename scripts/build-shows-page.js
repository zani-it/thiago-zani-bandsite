
const apiAddressShows = 'https://project-1-api.herokuapp.com/showdates?api_key=';
const apiKey = 'd17ee7f2-34f4-4bae-b206-8af2fd2e6731';
const container = document.querySelector('.shows__container');

const titleElementWrapper = document.createElement('div');
titleElementWrapper.classList.add('show__title--grid');

const titleDateElement = document.createElement('div');
titleDateElement.classList.add('show__title--grid--horizontal');
titleDateElement.textContent = 'DATE'
titleElementWrapper.appendChild(titleDateElement);

const titleVenueElement = document.createElement('div');
titleVenueElement.classList.add('show__title--grid--horizontal');
titleVenueElement.textContent = 'VENUE'
titleElementWrapper.appendChild(titleVenueElement);

const titleLocationElement = document.createElement('div');
titleLocationElement.classList.add('show__title--grid--horizontal');
titleLocationElement.textContent = 'LOCATION'
titleElementWrapper.appendChild(titleLocationElement);

container.appendChild(titleElementWrapper);

// Define show data
async function createShowElements() {
  const response = await axios.get(`${apiAddressShows}${apiKey}`);
  const showsData = response.data;

  for (const show of showsData) {

    const showElement = document.createElement('div');
    showElement.classList.add('show__column');
    container.appendChild(showElement);
    //
    const dateWrapperElement = document.createElement('div');
    dateWrapperElement.classList.add('show__column__date');
    showElement.appendChild(dateWrapperElement);

    const dateElementTitle = document.createElement('h3');
    dateElementTitle.classList.add('show__column__date--title');
    dateElementTitle.textContent = 'DATE';
    dateWrapperElement.appendChild(dateElementTitle);

    const dateElement = document.createElement('div');
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    dateElement.textContent = new Date(show.date).toLocaleDateString(undefined, options);
    dateWrapperElement.appendChild(dateElement);
    //
    const venueWrapperElement = document.createElement('div');
    venueWrapperElement.classList.add('show__column__venue');
    showElement.appendChild(venueWrapperElement);

    const venueElementTitle = document.createElement('h3');
    venueElementTitle.classList.add('show__column__venue--title');
    venueElementTitle.textContent = 'VENUE';
    venueWrapperElement.appendChild(venueElementTitle);

    const venueElement = document.createElement('div');
    venueElement.textContent = show.place;
    venueWrapperElement.appendChild(venueElement);
    //  
    const locationWrapperElement = document.createElement('div');
    locationWrapperElement.classList.add('show__column__location');
    showElement.appendChild(locationWrapperElement);

    const locationElementTitle = document.createElement('h3');
    locationElementTitle.classList.add('show__column__location--title');
    locationElementTitle.textContent = 'LOCATION';
    locationWrapperElement.appendChild(locationElementTitle)

    const locationElement = document.createElement('div');
    locationElement.textContent = show.location;
    locationWrapperElement.appendChild(locationElement);
    //
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('button--grid');
    buttonElement.textContent = 'BUY TICKETS';
    showElement.appendChild(buttonElement);

    const dividerElement = document.createElement('div');
    dividerElement.classList.add('show__divider');
    showElement.appendChild(dividerElement);

    const showElements = document.querySelectorAll('.show__column');

    showElements.forEach((showElement) => {
      showElement.addEventListener('click', function () {
        const currentlyClicked = document.querySelector('.clicked');
        if (currentlyClicked) {
          currentlyClicked.classList.remove('clicked');
        }
        this.classList.add('clicked');
      });
    });

  }
}

createShowElements();