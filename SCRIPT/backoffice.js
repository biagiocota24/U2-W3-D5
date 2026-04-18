const myKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZjQ3NzczOWY4NzAwMTU3YWIwYTIiLCJpYXQiOjE3NzY0MTU4NjMsImV4cCI6MTc3NzYyNTQ2M30.D60gNCqp-CYWG2Luaj_xp_-8l3n-K_7U_k67PZytfs0";
const apiLink = "https://striveschool-api.herokuapp.com/api/product/";
const allTheParams = new URLSearchParams(location.search);
const watchID = allTheParams.get("id");

const form = document.getElementById("form");
if (watchID) {
  document.getElementById("title-backoffice").innerText = "Custom your Watch";
  document.getElementById("form-btn").innerText = "CONFIRM CHANGES";
  document.getElementById("create-link").classList.remove("active");
  document.getElementById("custom-link").classList.add("active");

  fetch(apiLink + watchID, {
    headers: {
      authorization: myKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Spiacente , il salvataggio non è andato a buon fine ");
      }
    })
    .then((watch) => {
      document.getElementById("name-input").value = watch.name;
      document.getElementById("description-input").value = watch.description;
      document.getElementById("brand-input").value = watch.brand;
      document.getElementById("image-input").value = watch.imageUrl;
      document.getElementById("price-input").value = Number(watch.price);
    })
    .catch((error) => {
      console.log("Errore nel caricamento", error);
    });
}else{
    document.getElementById("custom-link").classList.add("d-none");
}


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name-input").value;
  const description = document.getElementById("description-input").value;
  const brand = document.getElementById("brand-input").value;
  const imageUrl = document.getElementById("image-input").value;
  const price = Number(document.getElementById("price-input").value);

  const myMethod = watchID ? "PUT" : "POST";
  const myUrl = watchID ? apiLink + watchID : apiLink;

  fetch(myUrl, {
    method: myMethod,
    headers: {
      "Content-Type": "application/json",
      authorization: myKey,
    },
    body: JSON.stringify({ name, description, brand, imageUrl, price }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Qualcosa non è andato a buon fine");
      }
    })
    .then((watch) => {
      console.log(watchID ? "Prodotto modificato" : "Nuovo prodotto salvato");
      if (!watchID) {
        form.reset();
      }
    })
    .catch((error) => {
      console.log("Errore nel caricamento della pagina");
    });
});

const clearBtn = document.getElementById("form-clear-btn")
localStorage.getItem(showToast)
clearBtn.addEventListener("click" , function(e){
  e.preventDefault()
  form.reset()
  showToast()
})

class product {
  constructor(_name, _description, _brand, _imageURL, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageURL;
    this.price = _price;
  }
}



