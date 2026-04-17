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
// const products = [
//   new product(
//     "Submariner Date",
//     "Orologio subacqueo iconico in acciaio con lunetta ceramica nera",
//     "Rolex",
//     "https://images.pexels.com/photos/9981957/pexels-photo-9981957.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     9550,
//   ),
//   new product(
//     "Nautilus 5711",
//     "Orologio sportivo elegante in acciaio con quadrante blu",
//     "Patek Philippe",
//     "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     35000,
//   ),
//   new product(
//     "Royal Oak 15500ST",
//     "Design ottagonale iconico in acciaio con quadrante blu tapisserie",
//     "Audemars Piguet",
//     "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     28500,
//   ),
//   new product(
//     "Speedmaster Moonwatch",
//     "Il primo orologio sulla luna, cronografo manuale in acciaio",
//     "Omega",
//     "https://images.pexels.com/photos/236915/pexels-photo-236915.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     6300,
//   ),
//   new product(
//     "Portugieser Chronograph",
//     "Cronografo elegante con cassa in acciaio da 41mm",
//     "IWC",
//     "https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     7200,
//   ),
//   new product(
//     "Lange 1",
//     "Orologio tedesco con grande data e display ore fuori centro",
//     "A. Lange & Söhne",
//     "https://images.pexels.com/photos/364822/pexels-photo-364822.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     32000,
//   ),
//   new product(
//     "Pilot's Watch Mark XX",
//     "Orologio da aviatore con quadrante nero e indici grandi",
//     "IWC",
//     "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     5100,
//   ),
//   new product(
//     "Reverso Tribute",
//     "Cassa reversibile Art Déco in oro bianco",
//     "Jaeger-LeCoultre",
//     "https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     18000,
//   ),
//   new product(
//     "Overseas Perpetual Calendar",
//     "Calendario perpetuo ultra-sottile in oro rosa",
//     "Vacheron Constantin",
//     "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     55000,
//   ),
//   new product(
//     "Big Bang Unico",
//     "Cronografo sportivo in titanio con movimento manufacture",
//     "Hublot",
//     "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
//     21000,
//   ),
// ];

// products.forEach((p) => {
//   fetch(apiLink, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: myKey,
//     },
//     body: JSON.stringify(p),
//   })
//     .then((response) => {
//       if (response.ok) return response.json();
//       else throw new Error("errore");
//     })
//     .then((data) => console.log("Salvato:", data.name))
//     .catch((error) => console.log("Errore:", error));
// });

const allTheParams = new URLSearchParams(location.search);
const watchID = allTheParams.get("id");

if (watchID) {
  document.getElementById("title-backoffice").innerText = "Custom your Watch";

fetch(apiLink + watchID , {
    headers : {
        authorization : myKey
    }
}).then(response=>{
    if(response.ok){
        return response.json()
    }})
.then(watch =>{
      document.getElementById("name-input").value = watch.name
  document.getElementById("description-input").value = watch.description
  document.getElementById("brand-input").value = watch.brand
  document.getElementById("image-input").value = watch.imageUrl
  document.getElementById("price-input").value = Number(watch.price)
})
.catch(error =>{

})}
else{
    console.log("nuovo prodotto")
}
    
