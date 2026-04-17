const apiLink = "https://striveschool-api.herokuapp.com/api/product/";
const myKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZjQ3NzczOWY4NzAwMTU3YWIwYTIiLCJpYXQiOjE3NzY0MTU4NjMsImV4cCI6MTc3NzYyNTQ2M30.D60gNCqp-CYWG2Luaj_xp_-8l3n-K_7U_k67PZytfs0";

const allTheParams = new URLSearchParams(location.search);
const watchId = allTheParams.get("id");

console.log(watchId);

fetch(apiLink + watchId, {
  headers: {
    authorization: myKey,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("problema nella richiesta");
    }
  })
  .then((watch) => {
    console.log(watch);
    const detailWrapper = document.getElementById("detail-wrapper");
    detailWrapper.innerHTML = `
        <div class="col-12 col-md-6 col-lg-4 card h-100 d-flex flex-column mt-5 shadow" style = "background-color : rgba(103, 228, 235, 0.5) ">
            <img src="${watch.imageUrl}" class="card-img-top rounded-circle shadow" alt="...">
             <div class="card-body d-flex flex-column flex-grow-1 justify-content-end">
             <h5 class="card-title">${watch.name}</h5>
            <p class="card-text">${watch.brand}</p>
            <p class="card-text">${watch.description}</p>
            <price class ="my-2 fw-bold text-black">${watch.price}€</price>
             <a href="./homepage.html" class="btn btn-warning" id= "card-btn">See the details</a>
             <button class ="btn btn-danger mt-2 remove-btn">Remove</button>
  </div>
</div>
        `;

    const removeBtn = detailWrapper.querySelector(".remove-btn");

    removeBtn.addEventListener("click", function () {
      fetch(apiLink + watchId, {
        method: "DELETE",
        headers: {
          authorization: myKey,
        },
      })
        .then((response) => {
          if (response.ok) {
            detailWrapper.remove();
            console.log("eliminato", watch.name);
          }
        })
        .catch((error) => {
          console.log("errore nel caricamento", error);
        });
    });
  })
  .catch((error) => {
    console.log("problemi di caricamento", error);
  });
