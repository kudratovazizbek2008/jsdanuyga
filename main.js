let form = document.getElementById("form")
    form.addEventListener("submit", function(e) {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message");

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const phoneRegex = /^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/;

    if (!passwordRegex.test(password)) {
        message.className = "error";
        message.textContent = " Parol kamida 8 belgidan iborat bo‘lishi va harf hamda raqamni o‘z ichiga olishi kerak.";
        return;
    }

    if (!phoneRegex.test(phone)) {
        message.className = "error";
        message.textContent = " Telefon raqami +998-XX-XXX-XX-XX formatida bo‘lishi kerak.";
        return;
    }

    message.className = "success";
    message.textContent = " Ma'lumotlar to‘g‘ri kiritildi";
});