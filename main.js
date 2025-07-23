let search = document.getElementById("search");
let result = document.getElementById("result");
let all = document.getElementById("all");
let radio_category = document.querySelectorAll(".radio_category");
result.style.display = "none";
search.addEventListener("input", e => {
    result.innerHTML = ""
    let resultData = data.filter((item) => {
        return item.name.toLowerCase().includes(search.value.toLowerCase());
    })
    result.classList.remove("hidden");
    if(search.value.length === 0){
        result.classList.add("hidden");
    }
    resultData.forEach((item) => {
        let div = document.createElement("div");
        div.innerHTML = `
        <p>${item.name}</p>
        `
        result.appendChild(div);
    })
})
radio_category.forEach(radio => {
    radio.addEventListener("change", e => {
        let filter = data.filter((item) => {
            return item.category.toLowerCase().includes(e.target.value.toLowerCase());
        })
        renderHtml(filter);
    })
})
all.addEventListener("click", e => {
    renderHtml(data)
})