(()=>{

const mobileWidth = 680;


  const onNavScroll = () => {
    const bodyOffset = document.body.scrollTop || document.documentElement.scrollTop;
    const navigation = document.querySelector("header nav");

    bodyOffset > 0 ? navigation.classList.add("cs-fixed-nav") : navigation.classList.remove("cs-fixed-nav");
  }

  const onNavItemClick = () => {
    const navItemsList = document.querySelectorAll(".cs-section-link");
    const navItems = [...navItemsList];

    navItems.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();

        const sectionId = event.target.getAttribute("href");

        scrollToSection(sectionId);
      })
    })
  }

  const scrollToSection = sectionId => {
    let sectionPosition, sectionOffset;
    const pageWidth = window.innerWidth;

    if (sectionId !== "#") {
      sectionOffset = document.querySelector(sectionId).offsetTop;
      sectionPosition = pageWidth > mobileWidth ? sectionOffset - 20 : sectionOffset;
    } else {
      sectionPosition = 0;
    }

    window.scrollTo({
      'behavior': 'smooth',
      'left': 0,
      'top': sectionPosition
    })
  }


  const onMoreCourses = () => {
    const courseArea = document.querySelector(".cs-courses-area");
    const courseCategoryList = document.querySelectorAll('.cs-course-container');
    const courseCategories = [...courseCategoryList];

    if (courseCategories.length > 3) {
      courseArea.insertAdjacentHTML('beforeend', '<span type="submit" id="cs-toggle-courses">Show more...</span>');
      courseCategories.forEach(course => {
        if (courseCategories.indexOf(course) > 2) {
          course.style.display = "none";
        }
      })

      let toggleCourses = document.querySelector("#cs-toggle-courses");

      toggleCourses.addEventListener("click", () => {
        courseCategories.forEach(course => {
          if (courseCategories.indexOf(course) > 2) {
            if (course.style.display == "none") {
              course.style.display = "block";
              toggleCourses.innerHTML = "Show less...";
            } else if (course.style.display == "block") {
              course.style.display = "none";
              toggleCourses.innerHTML = "Show more...";
            }
          }
        })

      })


    }

  }

  const onTestimonialChange = () => {
    let firstChild, lastChild;
    const prevArrow = document.querySelector("#cs-testimonial-prev");
    const nextArrow = document.querySelector("#cs-testimonial-next");
    const testimonials = document.querySelector(".cs-testimonials ul");

    document.addEventListener("click", () => {
      if (event.target === prevArrow) {
        lastChild = testimonials.lastElementChild;
        testimonials.insertAdjacentElement("afterbegin", lastChild);
      } else if (event.target === nextArrow) {
        firstChild = testimonials.firstElementChild;
        testimonials.insertAdjacentElement("beforeend", firstChild);
      }

    })

  }


  const onNavToggle = () => {
    const navToggle = document.querySelector("header nav .cs-nav-toggle");
    const navList = document.querySelector("header nav .cs-nav-container");


    navToggle.addEventListener("click" , () => {
      navList.classList.toggle("cs-nav-container-opened");
    })


    // close mobile navigation
    // const navItemsList = document.querySelectorAll(".cs-section-link");
    // const navItems = [...navItemsList];
    //
    // navItems.forEach(link => {
    //   link.addEventListener("click", () => {
    //     if (navList.className = "cs-nav-container-opened") {
    //       navList.style.maxHeight = "0";
    //       navList.style.overflow = "hidden";
    //     }
    //   })
    //
    // })
  }




  window.addEventListener("scroll",() => {
    onNavScroll();

  })

  onNavItemClick();
  onMoreCourses();
  onTestimonialChange();
  onNavToggle();



const searchBar = document.getElementById('search');
const courses = document.querySelectorAll('.cs-course-info');
const searchedList = document.getElementById('cs-searched-list');
const coursesArr = [...courses];

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  if (searchString.length < 1 || searchString == ' ') {
    searchedList.innerHTML = '';
  } else {
    const filteredCourses = coursesArr.filter((course) => {
      return(
        course.querySelector('h4').innerHTML.toLowerCase().includes(searchString)
      );
    });
      displayName(filteredCourses);
  }

})

const displayName = (courseGroup) => {
  const htmlString = courseGroup.map((course) => {
    const courseString = course.querySelector('h4').innerHTML;

    return `
            <li class="cs-searched">
                <h5>${courseString}</h5>
            </li>
        `;
  })
   .join('');
  searchedList.innerHTML = htmlString;
}



})()
