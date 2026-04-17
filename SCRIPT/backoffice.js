const myKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZjQ3NzczOWY4NzAwMTU3YWIwYTIiLCJpYXQiOjE3NzY0MTU4NjMsImV4cCI6MTc3NzYyNTQ2M30.D60gNCqp-CYWG2Luaj_xp_-8l3n-K_7U_k67PZytfs0";
const apiLink = "https://striveschool-api.herokuapp.com/api/product/";

fetch(apiLink, {
  headers: {
    authorization: myKey,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Qualcosa è andato storto");
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("Problemi di connesione");
  });

class product {
  constructor(_name, _description, _brand, _imageURL, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageURL;
    this.price = _price;
  }
}

const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name-input").value;
  const description = document.getElementById("description-input").value;
  const brand = document.getElementById("brand-input").value;
  const imageUrl = document.getElementById("image-input").value;
  const price = Number(document.getElementById("price-input").value);

  const nuovoProdotto = new product(name, description, brand, imageUrl, price);
  console.log(JSON.stringify(nuovoProdotto)); // ← controlla nella console

  fetch(apiLink, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: myKey,
    },
    body: JSON.stringify(nuovoProdotto),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nel salvataggio");
      }
    })
    .then((data) => {
      console.log("prodotto salvato", data);
      form.reset();
    })
    .catch((error) => {
      console.log("Qualcosa è andato storto");
    });
});
