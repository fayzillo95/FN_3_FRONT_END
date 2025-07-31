const coutryListDiv = document.getElementById("country-list")
const selectionRegion = document.getElementById("filter-option")
const searchButton = document.getElementById("search-button")
const searchInput = document.getElementById("seachInput")
const regions = []
const names = []

function coutryDivGenerator(data) {
    const divCountry = document.createElement("div")
    const img = document.createElement("img")
    const Name = document.createElement("h2")
    const divInfo = document.createElement("div")
    const populate = document.createElement("h3")
    const capital = document.createElement("p")
    const region = document.createElement("p")
    const borders = document.createElement("p")

    let stringPopulate = data.population.toLocaleString('de-DE')

    borders.textContent = "Border Countries : " + data.borders.join(", ")
    region.textContent = "Region : " + data.region
    capital.textContent = "Capitals : " + data.capital.join(", ")
    Name.textContent = data.name.common
    populate.textContent = `Populate : ${stringPopulate}`

    divCountry.className = "country-div"
    divInfo.className = "country-info-box"
    divCountry.appendChild(img)
    divInfo.appendChild(Name)
    divInfo.appendChild(populate)
    divInfo.appendChild(region)
    divInfo.appendChild(capital)
    img.setAttribute("alt", data.flags.alt)
    try {
        img.setAttribute("src", data.flags.png)
    } catch (error) {
        try {
            img.setAttribute("src", data.flags.svg)
        } catch (error) {
            img.setAttribute("src", "https://media.istockphoto.com/id/810919084/vector/all-world-flags-vector-icon-set.jpg?s=612x612&w=0&k=20&c=pjB-tfgBpWvjhMrIEAzr_pdzDzkDRz0SfKS0LNu9t-g=")
        }
    }
    img.className = "flag-image"
    divCountry.appendChild(divInfo)
    coutryListDiv.appendChild(divCountry)
}

function levenshtein(a, b) {
    const matrix = [];

    a = a.toLowerCase();
    b = b.toLowerCase();

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // o‘zgartirish
                    matrix[i][j - 1] + 1,     // qo‘shish
                    matrix[i - 1][j] + 1      // o‘chirish
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

searchInput.addEventListener("input", (e) => {
    console.log("Yangi matn:", e.target.value);
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log("Enter bosildi. Yuborilgan matn:", searchInput.value); 

        if(searchInput.value.trim().length === 0){
            getCoutryWriter()
            return
        }
        const nom = engYaqinDavlat(searchInput.value,names)
        getByName(nom)
    }
});
function engYaqinDavlat(search, davlatlar) {
    let bestMatch = "";
    let bestScore = Infinity;

    for (let davlat of davlatlar) {
        const score = levenshtein(search, davlat);
        if (score < bestScore) {
            bestScore = score;
            bestMatch = davlat;
        }
    }

    return bestMatch;
}


function getCoutryWriter(page = 1) {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages,currencies,region,subregion,borders")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            console.log("✅ Davlatlar ro'yxati:");
            console.log(data[0]);
            coutryListDiv.textContent = ""

            for (let i = 0; i < 251; i++) {
                if (data[i]) {
                    names.push(data[i].name.common)
                    regions.push(data[i].region)
                    if (i < (page * 12) && ((page * 12) - 12) < i) {
                        coutryDivGenerator(data[i])
                    }
                }
            }

            for (let region of regions) {
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

async function getByName(name) {
    const engYaqinDavlatNomi = engYaqinDavlat(name, names)
    const request = await fetch(`https://restcountries.com/v3.1/name/${engYaqinDavlatNomi}?fields=name,capital,population,flags,languages,currencies,region,subregion,borders`)
    const response = await request.json()
    if (response.message) {
        alert(engYaqinDavlatNomi)
        getCoutryWriter(1)
        return
    }
    console.log(engYaqinDavlatNomi)
    console.log(response)
    coutryListDiv.textContent = ""
    if (Array.isArray(response)) {
        response.forEach(davlat => coutryDivGenerator(davlat))
    } else {
        coutryDivGenerator(response)
    }
    console.log(response)
}

searchButton.addEventListener('click', (event) => {
    console.log(searchInput.value)
    getByName(searchInput.value)
})