function showSidebar() {
    const sidebar = document.querySelector(".sidebar")
    sidebar.style.display = "flex"
}

function hideSidebar() {
    const sidebar = document.querySelector(".sidebar")
    sidebar.style.display = "none"
}

// Pagination function and listeners

let currentPage = "home";

const changePage = (page) => {

    if (page === currentPage) return

    const home = document.getElementById("home");
    const aboutUs = document.getElementById("aboutUs");
    const contactUs = document.getElementById("contactUs");



    // Add exit class to current page
    switch (currentPage) {
        case "home":
            home.classList.add("exit");
            break;
        case "aboutUs":
            aboutUs.classList.add("exit");
            break;
        case "contactUs":
            contactUs.classList.add("exit");
            break;
        default:
            break;
    }


    setTimeout(() => {
        // Hide all pages
        switch (currentPage) {
            case "home":
                home.style.display = "none";
                home.classList.remove("exit");
                home.classList.remove("animatedEntrance");
                break;
            case "aboutUs":
                aboutUs.style.display = "none";
                aboutUs.classList.remove("exit");
                aboutUs.classList.remove("animatedEntrance");
                break;
            case "contactUs":
                contactUs.style.display = "none";
                contactUs.classList.remove("exit");
                contactUs.classList.remove("animatedEntrance");
                break;
            default:
                break;
        }

        // Show the selected page
        switch (page) {
            case "home":
                home.classList.add("animatedEntrance");
                home.style.display = "flex";
                break;
            case "aboutUs":
                aboutUs.classList.add("animatedEntrance");
                aboutUs.style.display = "block";
                break;
            case "contactUs":
                contactUs.classList.add("animatedEntrance");
                contactUs.style.display = "flex";
                break;
            default:
                break;
        }

        // Update current page
        currentPage = page;
    }, 1000);
}

// Fetch data and searchbar functions

var data

const fetchData = async () => {
   const res = (await fetch("./travel_recommendation_api.json")).json()
   console.log(await res)
   data = await res
}

const createAndShowResultCard = () => {
    const resultsDiv = document.getElementById("results");
    const searchInput = document.getElementById("navbarInput").value.toLowerCase();
  
    const getResults = () => {
      if (searchInput.includes("beach")) return data.beaches;
      if (searchInput.includes("temple")) return data.temples;
      const country = data.countries.find((country) => country.name.toLowerCase() === searchInput);
      return country ? country.cities : [];
    };
  
    const results = getResults();
    resultsDiv.innerHTML = "";
    results.forEach((item) => {
      resultsDiv.innerHTML += `
        <div class="resultCard glassmorphism">
          <div>
            <img class="cardImg" src="${item.imageUrl}" alt="">
          </div>
          <div class="cardTextWrapper">
            <div class="resultTitle">${item.name}</div>
            <div class="resultcardDescription">
              ${item.description}
            </div>
          </div>
        </div>
      `;
    });
  };



window.addEventListener("load", function  (event) {
    fetchData()
    const buttons = [
        { id: "sidebarHomeButton", page: "home" },
        { id: "navbarHomeButton", page: "home" },
        { id: "sidebarAboutButton", page: "aboutUs" },
        { id: "navbarAboutButton", page: "aboutUs" },
        { id: "sidebarContactButton", page: "contactUs" },
        { id: "navbarContactButton", page: "contactUs" },
    ];

    buttons.forEach(({ id, page }) => {
        const button = document.getElementById(id);
        button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            changePage(page);
        });
    });

    const navSearchbarBtn = document.getElementById("navbarSearchButton");
    navSearchbarBtn.addEventListener("click", () => {
        createAndShowResultCard()
    })

    const clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", () => {
        const resultsDiv = document.getElementById("results");
        const input = document.getElementById("navbarInput");
        input.value = ""
        resultsDiv.innerHTML = ""
    })
});

