const coutryListDiv = document.getElementById("country-list")
const selectionRegion = document.getElementById("filter-option")
const searchButton = document.getElementById("search-button")
const searchInput = document.getElementById("seachInput")

function getCoutryWriter() {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages,currencies,region,subregion,borders")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const regions = []
            console.log("✅ Davlatlar ro'yxati:");
            console.log(data[0]);
            for (let i = 0; i < 12; i++) {
                const divCountry = document.createElement("div")
                const img = document.createElement("img")
                const Name = document.createElement("h2")
                const divInfo = document.createElement("div")
                const populate = document.createElement("h3")
                const capital = document.createElement("p")
                const region = document.createElement("p")
                const borders = document.createElement("p")

                let stringPopulate = data[i].population.toLocaleString('de-DE')

                borders.textContent = "Border Countries : " + data[i].borders.join(", ")
                region.textContent = "Region : " + data[i].region
                capital.textContent = "Capitals : " + data[i].capital.join(", ")
                Name.textContent = data[i].name.common
                populate.textContent = `Populate : ${stringPopulate}`

                divCountry.className = "country-div"
                divInfo.className = "country-info-box"
                divCountry.appendChild(img)
                divInfo.appendChild(Name)
                divInfo.appendChild(populate)
                divInfo.appendChild(region)
                divInfo.appendChild(capital)
                img.setAttribute("alt", data[i].flags.alt)
                try {
                    img.setAttribute("src", data[i].flags.png)
                } catch (error) {
                    try {
                        img.setAttribute("src", data[i].flags.svg)
                    } catch (error) {
                        img.setAttribute("src", "https://media.istockphoto.com/id/810919084/vector/all-world-flags-vector-icon-set.jpg?s=612x612&w=0&k=20&c=pjB-tfgBpWvjhMrIEAzr_pdzDzkDRz0SfKS0LNu9t-g=")
                    }
                }
                img.className = "flag-image"
                divCountry.appendChild(divInfo)
                coutryListDiv.appendChild(divCountry)
                regions.push(data[i].region)
            }
            for(let region of regions){
                const option = document.createElement("option")
                option.value = region[0].toUpperCase() + region.slice(1).toLowerCase()
                option.textContent = region[0].toUpperCase() + region.slice(1).toLowerCase()
                option.className = "option-region"
                selectionRegion.appendChild(option)
            }
        })
        .catch(error => {
            console.error("❌ XatodivCountryk:", error);
        });
}
getCoutryWriter()


/*
<option value="" spellcheck="true" disabled selected style="display: none;">Filtered By Region</option>
<option value="Asia">Asia</option>
*/

async function getByName(name){
   const request = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages,currencies,region,subregion,borders`)
  const response = await request.json()
  if(response.message){
     alert(response.message)
  }
  console.log(response)
}

searchButton.addEventListener('click',(event) =>{
  console.log(searchInput.value)
  getByName(searchInput.value)
})