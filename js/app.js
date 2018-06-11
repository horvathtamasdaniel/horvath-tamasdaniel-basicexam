function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);

  var sorted = sortByPrice(userDatas);
  var filtered = filterByConsumables(sorted);
  var noNull = nullToUnknown(filtered);


  var searchInput = document.getElementById("search-text");
  var SearchButton = document.getElementById("search-button");
  SearchButton.addEventListener("click", searchByModel, false);

  function searchByModel() {
    var filter = searchInput.value;
    var result = [];
    var searchPanel = document.querySelector(".one-spaceship");

    for (var i = 0; i < filtered.length; i++) {
      if (
        filtered[i].model.toLowerCase().indexOf(filter.toLowerCase()) !=
        -1
      ) {
        result.push(filtered[i]);
      }
    }
    if (result.length > 0) {
      searchPanel.innerText = "";
      shipToDiv(result[0], searchPanel);
    } else {
      alert("Character not found!");
    }

  }


  drawShips(filtered);
  onePersonCrew(filtered);
  largestCarg(filtered);
  sumPass(filtered);
  longestShip2(filtered);
  createStats();

}

function sortByPrice(arr) {
  arr.sort(function (a, b) {
    return a.cost_in_credits - b.cost_in_credits;
  });
  return arr;
}

function filterByConsumables(arr) {
  for (var i = arr.length - 1; i >= 0; --i) {
    if (arr[i].consumables == null) {
      arr.splice(i, 1);
    }
  }
  return arr;
}

function nullToUnknown(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j in arr[i]) {
      if (arr[i][j] === null) {
        arr[i][j] = "unknown";
      }
    }
  }
  return arr;
}

function shipToDiv(obj, containerPanel) {
  var objThumbnail = document.createElement("div");
  var objPicDiv = document.createElement("div");
  var objPic = document.createElement("img");
  var objDetails = document.createElement("div");
  var objCons = document.createElement("div");
  var objDenom = document.createElement("div");
  var objCargo = document.createElement("div");
  var objPass = document.createElement("div");
  var objMaxSpeed = document.createElement("div");
  var objCrew = document.createElement("div");
  var objLength = document.createElement("div");
  var objModel = document.createElement("div");
  var objCost = document.createElement("div");
  var objManuf = document.createElement("div");



  objThumbnail.setAttribute("id", obj.id);
  objThumbnail.classList.add("thumbnail");
  objThumbnail.appendChild(objPicDiv);
  objPicDiv.appendChild(objPic);
  objThumbnail.appendChild(objDetails);
  objPicDiv.classList.add('objPic');
  objPic.setAttribute("src", "/img/" + obj.image);
  objPic.setAttribute("alt", " No picture available :(");
  objDetails.classList.add("objDetails");
  objDetails.appendChild(objModel);
  objModel.innerText = obj.model;
  objModel.classList.add("model");
  objDetails.appendChild(objManuf);
  objManuf.innerText = "Manufacturer: " + obj.manufacturer;
  objManuf.classList.add("detailDiv");
  objDetails.appendChild(objCons);
  objCons.innerText = "Consumalbles: " + obj.consumables;
  objCons.classList.add("detailDiv");
  objDetails.appendChild(objDenom);
  objDenom.innerText = "Denomination: " + obj.denomination;
  objDenom.classList.add("detailDiv");
  objDetails.appendChild(objCargo);
  objCargo.innerText = "Cargo capacity: " + obj.cargo_capacity;
  objCargo.classList.add("detailDiv");
  objDetails.appendChild(objPass);
  objPass.innerText = "Passengers: " + obj.passengers;
  objPass.classList.add("detailDiv");
  objDetails.appendChild(objMaxSpeed);
  objMaxSpeed.innerText = "Maximum speed: " + obj.max_atmosphering_speed;
  objMaxSpeed.classList.add("detailDiv");
  objDetails.appendChild(objCrew);
  objCrew.innerText = "Crew: " + obj.crew;
  objCrew.classList.add("detailDiv");
  objDetails.appendChild(objLength);
  objLength.innerText = "Length: " + obj.lengthiness;
  objLength.classList.add("detailDiv");
  objDetails.appendChild(objCost);
  objCost.innerText = "Cost in credits: " + obj.cost_in_credits;
  objCost.classList.add("detailDiv");
  containerPanel.appendChild(objThumbnail);
}

function drawShips(array) {
  var targetPanel = document.querySelector(".shapceship-list");
  //targetPanel.innerText = "";
  for (var i = 0; i < array.length; i++) {
    shipToDiv(array[i], targetPanel);
  }
}

function createStats() {
  var statsDiv = document.createElement("div");
  var oneCrew = document.createElement("div");
  var largestCargo = document.createElement("div");
  var sumPassengers = document.createElement("div");
  var longestShip = document.createElement("div");
  var longestShipPic = document.createElement("img");
  var statsContainer = document.querySelector(".shapceship-list");

  statsContainer.appendChild(statsDiv);
  statsDiv.appendChild(oneCrew);
  oneCrew.innerText = "Number of ships operated by one person: " + lonelyShips;
  oneCrew.classList.add("detailDiv");
  statsDiv.appendChild(largestCargo);
  largestCargo.innerText = "Ship with the largest cargo capacity: " + cargoKing;
  largestCargo.classList.add("detailDiv");
  statsDiv.appendChild(sumPassengers);
  sumPassengers.innerText = "Sum of passengers of all listed ships: " + passengersSum;
  sumPassengers.classList.add("detailDiv");
  statsDiv.appendChild(longestShip);
  longestShip.innerText = "Picture of the longest ship of all above: ";
  longestShip.classList.add("detailDiv");
  longestShip.appendChild(longestShipPic);
  longestShipPic.setAttribute("src", "/img/" + longShip.image);
  longestShipPic.setAttribute("alt", " No picture available :(");
}







var lonelyShips = 0;

function onePersonCrew(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].crew == "1") {
      lonelyShips++;
    }
  }
}

var cargoKing = 0;

function largestCarg(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].cargo_capacity > cargoKing) {
      cargoKing = arr[i].model;
    }
  }
}

var passengersSum = 0;

function sumPass(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].passengers !== "unknown") {
      passengersSum += Number(arr[i].passengers);
    }
  }
}

var longShip;

function longestShip2(arr) {
  for (var i = 0; i < arr.length; i++) {
    var longest = arr[0];
    if (Number(arr[i].lengthiness) > Number(longest.lengthiness)) {
      longest = arr[i];
    }
  }
  longShip = longest;
}

var pageTitle = document.getElementsByTagName("title");
pageTitle[0].innerText = "Star Wars Spaceship Reference"

var Head



getData('/json/spaceships.json', successAjax);