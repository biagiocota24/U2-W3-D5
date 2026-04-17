const apiLink = "https://striveschool-api.herokuapp.com/api/product/";
const myKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZjQ3NzczOWY4NzAwMTU3YWIwYTIiLCJpYXQiOjE3NzY0MTU4NjMsImV4cCI6MTc3NzYyNTQ2M30.D60gNCqp-CYWG2Luaj_xp_-8l3n-K_7U_k67PZytfs0";

// fetch(apiLink, {
//   headers: {
//     authorization: myKey,
//   },
// })
//   .then((response) => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("Qualcosa è andato storto");
//     }
//   })
//   .then((data) => {
//     console.log(data);
//     document.getElementById("cards-placeholder").classList.add("d-none");
//     data.forEach((watch) => {
//       const card = document.createElement("div");
//       card.innerHTML = `
//         <div class="card h-100 d-flex flex-column" style = "background-color : rgba(103, 228, 235, 0.5) ">
//             <img src="${watch.imageUrl}" class="card-img-top rounded-circle shadow" alt="...">
//              <div class="card-body d-flex flex-column flex-grow-1 justify-content-end">
//              <h5 class="card-title">${watch.name}</h5>
//             <p class="card-text">${watch.brand}</p>
//             <p class="card-text">${watch.description}</p>
//             <price class ="my-2 fw-bold text-black">${watch.price}€</price>
//              <a href="./details.html?id=${watch._id}" class="btn btn-warning" id= "card-btn">See the details</a>
//              <button class ="btn btn-danger mt-2 remove-btn">Remove</button>
//              <a href = "./backoffice.html?id=${watch._id}" class ="btn btn-info mt-2 remove-btn text-light">Customise your Watch</a>
//   </div>
// </div>
//         `;
//       document.getElementById("cards-wrapper").appendChild(card);

//   const removeBtn = card.querySelector(".remove-btn");
//   removeBtn.addEventListener("click", function () {
//     fetch(apiLink + watch._id, {
//       method: "DELETE",
//       headers: {
//         authorization: myKey,
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           card.remove();
//           console.log("eliminato", watch.name);
//         }
//       })
//       .catch((error) => {
//         console.log("errore nel caricamento", error);
//       });
//   });
//     });
//   })
//   .catch((error) => {
//     (console.log("Problemi di connesione"), error);
//   });

const renderCards = function (watches) {
  watches.forEach((watch) => {
    const card = document.createElement("div");
    card.innerHTML = ""
    card.innerHTML = `
      <div class="card h-100 d-flex flex-column" style = "background-color : rgba(103, 228, 235, 0.5) ">
      <img src="${watch.imageUrl}" class="card-img-top rounded-circle shadow" alt="...">
      <div class="card-body d-flex flex-column flex-grow-1 justify-content-end">
      <h5 class="card-title">${watch.name}</h5>
      <p class="card-text">${watch.brand}</p>
      <p class="card-text">${watch.description}</p>
      <price class ="my-2 fw-bold text-black">${watch.price}€</price>
      <a href="./details.html?id=${watch._id}" class="btn btn-warning" id= "card-btn">See the details</a>
      <button class ="btn btn-danger mt-2 remove-btn">Remove</button>
      <a href = "./backoffice.html?id=${watch._id}" class ="btn btn-info mt-2 remove-btn text-light">Customise your Watch</a>
      </div>
      </div>
      `;

    document.getElementById("cards-wrapper").appendChild(card);

    const removeBtn = card.querySelector(".remove-btn");
    removeBtn.addEventListener("click", function () {
      fetch(apiLink + watch._id, {
        method: "DELETE",
        headers: {
          authorization: myKey,
        },
      })
        .then((response) => {
          if (response.ok) {
            card.remove();
            console.log("eliminato", watch.name);
          }
        })
        .catch((error) => {
          console.log("errore nel caricamento", error);
        });
    });
  });
};

let allTheWatches = [];

fetch(apiLink, {
  headers: {
    authorization: myKey,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("La ricerca non è andata a buon fine");
    }
  })
  .then((watch) => {
    allTheWatches = watch;
    document.getElementById("cards-placeholder").classList.add("d-none");
    renderCards(watch);
  });

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", function () {
  const query = searchBar.value.trim().toLowerCase();

  if (!query) {
    renderCards(allTheWatches);
    return;
  }

  const watchesFiltred = allTheWatches.filter((watch) => {
    return watch.name.toLowerCase().includes(query) || watch.brand.toLowerCase().includes(query) || watch._id.toLowerCase().includes(query);
  });

  renderCards(watchesFiltred);
  console.log(watchesFiltred)
});
