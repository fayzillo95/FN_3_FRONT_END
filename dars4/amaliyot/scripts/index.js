const mainTag = document.getElementsByTagName("main")[0];

fetch("./scripts/extensions.json").then(async (result) => {
    const response = await result.json();

    for (let data of response) {
        const div = document.createElement("div");
        div.classList.add("main-item-box");

        // 1-quti (main-item-sub-box1)
        const subBox1 = document.createElement("div");
        subBox1.classList.add("main-item-sub-box1");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");

        const iconSpan = document.createElement("span");
        const icon = document.createElement("i");
        icon.classList.add(...data.icon);
        console.log(data.icon,icon.classList)
        iconSpan.appendChild(icon);

        const textSpan = document.createElement("span");

        const h1 = document.createElement("h1");
        h1.classList.add("extension-name");
        h1.textContent = data.name;

        const p = document.createElement("p");
        p.textContent = data.description;

        textSpan.appendChild(h1);
        textSpan.appendChild(p);

        infoDiv.appendChild(iconSpan);
        infoDiv.appendChild(textSpan);
        subBox1.appendChild(infoDiv);

        // 2-quti (main-item-sub-box2)
        const subBox2 = document.createElement("div");
        subBox2.classList.add("main-item-sub-box2");

        const button = document.createElement("button");
        button.classList.add("main-item-sub2-button-remove");
        button.textContent = "Remove";

        const toggleSpan = document.createElement("span");
        const toggleIcon = document.createElement("i");
        toggleIcon.classList.add("fa-solid", "fa-toggle-on");
        toggleSpan.appendChild(toggleIcon);

        subBox2.appendChild(button);
        subBox2.appendChild(toggleSpan);

        // Barcha qismlarni birlashtirish
        div.appendChild(subBox1);
        div.appendChild(subBox2);
        mainTag.appendChild(div);
    }

    const tugma = document.getElementsByClassName("fa-solid")
    for (let [index, icon] of Object.entries(tugma)) {
        tugma[index].addEventListener("click", (event) => {
            console.log(tugma[index])

            if (tugma[index].classList.contains('fa-toggle-on')) {
                tugma[index].classList.remove('fa-toggle-on')
                tugma[index].classList.add('fa-toggle-off')
            } else {
                tugma[index].classList.remove('fa-toggle-off')
                tugma[index].classList.add('fa-toggle-on')
            }
        })
    }
});
