document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pizzaForm");
    const usResidentDropdown = document.getElementById("usResident");
    const zipcodeField = document.getElementById("zipcodeField");
    const currentYear = new Date().getFullYear();
    const nameError = document.getElementById("nameError");
    const birthYearError = document.getElementById("birthYearError");
    const zipcodeError = document.getElementById("zipcodeError");
    const passwordError = document.getElementById("passwordError");
    const toppingError = document.getElementById("toppingError");
    const formResult = document.getElementById("formResult");

    // Show/hide the ZIP code field based on US resident selection
    usResidentDropdown.addEventListener("change", () => {
        zipcodeField.style.display = usResidentDropdown.value === "yes" ? "block" : "none";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission for validation

        // Clear previous error messages
        nameError.style.display = "none";
        birthYearError.style.display = "none";
        zipcodeError.style.display = "none";
        passwordError.style.display = "none";
        toppingError.style.display = "none";
        formResult.innerText = "";

        let isValid = true;

        // Validate Name
        const nameValue = document.getElementById("name").value;
        const namePattern = /^[A-Za-z\s]+$/;
        if (!namePattern.test(nameValue) || nameValue.length < 3) {
            nameError.innerText = "Name must contain only alphabets and spaces, and be at least 3 characters long.";
            nameError.style.display = "inline";
            isValid = false;
        }

        // Validate Year of Birth
        const birthYear = parseInt(document.getElementById("birthYear").value);
        if (isNaN(birthYear) || birthYear < 1901 || birthYear >= currentYear) {
            birthYearError.innerText = "Please enter a valid year of birth.";
            birthYearError.style.display = "inline";
            isValid = false;
        }

        // Validate Zipcode (only if "Yes" is selected)
        if (usResidentDropdown.value === "yes") {
            const zipcodeValue = document.getElementById("zipcode").value;
            if (!/^\d{5}$/.test(zipcodeValue)) {
                zipcodeError.innerText = "Please enter a valid 5-digit ZIP code.";
                zipcodeError.style.display = "inline";
                isValid = false;
            }
        }

        // Validate Password
        const password = document.getElementById("password").value;
        if (password.length < 8) {
            passwordError.innerText = "Password must be at least 8 characters long.";
            passwordError.style.display = "inline";
            isValid = false;
        }

        // Validate Topping Selection
        const topping = document.getElementById("topping").value;
        if (topping === "") {
            toppingError.innerText = "Please select a topping.";
            toppingError.style.display = "inline";
            isValid = false;
        }

        // If all fields are valid, show success message
        if (isValid) {
            formResult.innerText = "Accepted!";
            form.reset();
            zipcodeField.style.display = "none"; // Hide zipcode field
        }
    });
});
