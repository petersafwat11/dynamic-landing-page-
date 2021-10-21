/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = Array.from(document.querySelectorAll("section"));
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// first we get the button from DOM
const x = document.querySelector('a');
x.addEventListener("click", addSection);

// make section button function 
function addSection(e){
    e.preventDefault();
    // create new element 
    let newSetion = document.createElement("section");
    // make a counter to use later in attributes 
    let i = Array.from(document.querySelectorAll("section")).length+1;
    // inject the attributes to the sections 
    newSetion.setAttribute('id','section'+i);
    newSetion.setAttribute('data-nav','section '+i);
    // the body of the section ny the methode innerHTML
    newSetion.innerHTML = ` <div class="landing__container">
    <h2>Section ${i}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
  </div>`;
  // add the section to the DOM
  document.querySelector('main').appendChild(newSetion);
  // make a listItem for the newSection 
  let newLi = document.createElement('li');
  newLi.innerHTML = `<a class='menu__link' href='#${newSetion.id}' data-id='${newSetion.id}'> section ${i} </a>`;
  // add the listItem to the DOM
  document.getElementById("navbar__list").appendChild(newLi);
}

// build the nav for the first 4 sections made in HTML
function createListItem(){
    for (section of sections){
        // get the data nav attribute to use it as a name for the item
        itemName = section.getAttribute("data-nav");
        // creat new item for each section
        newItem = document.createElement("li");
         // connect the name and link attributes to the new created item
        newItem.innerHTML = `<a class='menu__link' href='#${section.id}' data-id='${section.id}'> ${itemName} </a>`;
        // add the item to the DOM
        document.getElementById("navbar__list").appendChild(newItem);
    }
}



// Add class 'active' to section when near top of viewport
/*
window.addEventListener('scroll', function() {
	let elements = Array.from(document.querySelectorAll("section"));
  elements.forEach(ele => {

   position = ele.getBoundingClientRect();
   if(position.top >= 0 && position.bottom <= window.innerHeight) {
		ele.classList.add('your-active-class');
    if (ele.classList.contains('your-active-class')){
      let activeLink = document.querySelector(`[href*= "${ele.id}"]`);
      activeLink.classList.add('link__active');
    }
	}
  else{
    ele.classList.remove('your-active-class');
    if (!ele.classList.contains('your-active-class')){
      let activeLink = document.querySelector(`[href*= "${ele.id}"]`);
      activeLink.classList.remove('link__active');
    }
  }
  })
  
});
*/

// new fuction to add active class to section and navigation item 
window.addEventListener('scroll', function () {
  let scrollPosition = document.body.scrollTop;
  let sections = Array.from(document.querySelectorAll("section"));
  sections.forEach((section) => {
    if (
      scrollPosition >= section.offsetTop - section.offsetHeight * 0.25 &&
      scrollPosition <
        section.offsetTop + section.offsetHeight - section.offsetHeight * 0.25
    ) {
      section.classList.add('your-active-class');
      let currentId = section.attributes.id.value;
      removeAllActiveClasses();
      addActiveClass(currentId);
    }
    else{
      section.classList.remove('your-active-class');
    }
  });
});
// function to remove active class to nav item 

const removeAllActiveClasses = function () {
  document.querySelectorAll("nav a").forEach((el) => {
    el.classList.remove("link__active");
  });
}
// function to add active class to nav item 
const addActiveClass = function (id) {
  // console.log(id);
  let selector = `nav a[href="#${id}"]`;
  document.querySelector(selector).classList.add("link__active");
}

//Get the button that scroll to the top of the page 
let mybutton = document.querySelector("#myBtn");
// add eventListener to the button
mybutton.addEventListener("click",topFunction);


// controll when the button show to the user 

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  // make the button visible when the user scroll 100px to the bottom
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document smoothly
function topFunction() {
  window.scroll({
    top: 0,
    behavior: "smooth"
  });
  }


// Scroll to anchor ID using scrollTO event
// make an eventListener to the navbar and then check if the clicked area is a anchor tag that has an attribute data-id
const navbar = document.querySelector('#navbar__list');
navbar.addEventListener('click', e =>{
  // first we prevent the default behavior
  e.preventDefault();
  if(e.target.dataset.id){
    // get the element and make the scroll smooth 
    document.getElementById(e.target.dataset.id).scrollIntoView({behavior : 'smooth'});

  }
    setTimeout( ()=> {
      location.hash  = e.target.dataset.id;
    }, 300)
  
})

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
createListItem();
