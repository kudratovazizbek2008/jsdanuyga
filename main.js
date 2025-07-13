let adForm = document.getElementById("adForm");
let inputTitle = document.getElementById("inputTitle");
let inputDescription = document.getElementById("inputDescription");
let inputImageUrl = document.getElementById("inputImageUrl");
let selectCategory = document.getElementById("selectCategory");
let selectCondition = document.getElementById("selectCondition");
let adsContainer = document.getElementById("adsContainer");
let loadingSpinner = document.getElementById("loadingSpinner");
let confirmBox = document.getElementById("confirmBox");
let btnYes = document.getElementById("btnYes");
let btnNo = document.getElementById("btnNo");

confirmBox.style.display = "none";

let isEditMode = false;
let currentAdId = null;

adForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitAdData();
});

async function submitAdData() {
    try {
        loadingSpinner.classList.add("loader");

        const payload = {
            title: inputTitle.value,
            description: inputDescription.value,
            image_url: inputImageUrl.value,
            category: selectCategory.value,
            condition: selectCondition.value
        };

        let response;
        if (isEditMode) {
            response = await fetch(`https://effective-mobile.duckdns.org/api/ads/${currentAdId}/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } else {
            response = await fetch("https://effective-mobile.duckdns.org/api/ads/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        }

        if (response.ok) {
            alert(isEditMode ? "Successfully updated" : "Successfully created");
            clearForm();
            fetchAds();
        } else {
            alert("Error occurred");
        }

        location.reload();

    } catch (err) {
        console.log(err);
    } finally {
        loadingSpinner.classList.remove("loader");
    }
}

function clearForm() {
    inputTitle.value = "";
    inputDescription.value = "";
    inputImageUrl.value = "";
    selectCategory.value = "";
    selectCondition.value = "";
    isEditMode = false;
    currentAdId = null;
}

async function fetchAds() {
    try {
        const response = await fetch("https://effective-mobile.duckdns.org/api/ads/");
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            renderAds(data.results);
        } else {
            alert("Ma'lumot topilmadi");
        }
    } catch (err) {
        console.log(err);
    }
}

function renderAds(ads) {
    adsContainer.innerHTML = ""; // oldingi kontentni tozalash
    ads.forEach(ad => {
        const adCard = document.createElement("div");
        adCard.innerHTML = `
            <p>${ad.title}</p>
            <p>${ad.description}</p>
            <img src="${ad.image_url}" alt="${ad.image_url}" style="width: 200px; height: auto; object-fit: contain;" />
            <p>${ad.category}</p>
            <p>${ad.condition}</p>
            <button data-id="${ad.id}" class="btnEdit">Edit</button>
            <button data-id="${ad.id}" class="btnDelete">Delete</button>
        `;
        adsContainer.appendChild(adCard);

        adCard.querySelector(".btnDelete").addEventListener("click", () => {
            confirmBox.style.display = "block";

            btnYes.onclick = () => {
                deleteAd(ad.id);
                confirmBox.style.display = "none";
            };

            btnNo.onclick = () => {
                confirmBox.style.display = "none";
            };
        });

        adCard.querySelector(".btnEdit").addEventListener("click", () => {
            loadAdToForm(ad.id);
            currentAdId = ad.id;
        });
    });
}

async function deleteAd(id) {
    try {
        loadingSpinner.classList.add("loader");

        const response = await fetch(`https://effective-mobile.duckdns.org/api/ads/${id}/`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Successfully deleted");
            fetchAds();
        } else {
            alert("Delete error");
        }

        location.reload();

    } catch (err) {
        console.log(err);
    } finally {
        loadingSpinner.classList.remove("loader");
    }
}

async function loadAdToForm(id) {
    try {
        loadingSpinner.classList.add("loader");

        const response = await fetch(`https://effective-mobile.duckdns.org/api/ads/${id}/`);
        const ad = await response.json();

        inputTitle.value = ad.title;
        inputDescription.value = ad.description;
        inputImageUrl.value = ad.image_url;
        selectCategory.value = ad.category;
        selectCondition.value = ad.condition;

        isEditMode = true;

    } catch (err) {
        console.log(err);
    } finally {
        loadingSpinner.classList.remove("loader");
    }
}

// Start by fetching existing ads
fetchAds();
