document.addEventListener("DOMContentLoaded", () => {
    // Variables for sections and navigation
    const sections = document.querySelectorAll(".question-section");
    const instructionsBtn = document.getElementById("instructions-btn");
    const modal = document.getElementById("instructions-modal");
    const closeBtn = document.querySelector(".close-btn");
    const startBtn = document.getElementById("start-btn");
    // const backBtn = document.getElementById("back-btn");
    const registrationForm = document.getElementById("registration-form");
    let currentSection = 0;

    /**
     * Redirects from the start page to the disclaimer page.
     */
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            window.location.href = "disclaimer.html";
        });
    }

    /**
     * Redirects from section 1 back to the disclaimer page.
     */
    const backBtns = document.querySelectorAll(".back-btn");
    backBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            window.location.href = "disclaimer.html";
        });
    });

    /**
     * Redirects from disclaimer back to the start page.
     */
    const backToStartBtns = document.querySelectorAll(".back-to-start-btn");
    backToStartBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    });

    /**
     * Handles registration form submission and redirects to the test page.
     */
    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            window.location.href = "test.html";
        });
    }

    /**
     * Validates required input fields in the current section.
     * @param {NodeList} inputs - List of input fields to validate.
     * @returns {boolean} - True if all fields are filled; otherwise, false.
     */
    const validateInputs = (inputs) => {
        for (const input of inputs) {
            if (!input.value.trim()) {
                alert("Please answer all questions before moving to the next section.");
                input.focus();
                return false;
            }
        }
        return true;
    };

    /**
     * Navigates to the next section if all fields in the current section are valid.
     */
    const nextBtns = document.querySelectorAll(".next-btn");
    nextBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const currentInputs = sections[currentSection].querySelectorAll("input[required]");
            if (validateInputs(currentInputs)) {
                sections[currentSection].style.display = "none";
                currentSection++;
                sections[currentSection].style.display = "block";
                window.scrollTo(0, 0);
            }
        });
    });

    /**
     * Navigates to the previous section.
     */
    const prevBtns = document.querySelectorAll(".prev-btn");
    prevBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            sections[currentSection].style.display = "none";
            currentSection--;
            sections[currentSection].style.display = "block";
            window.scrollTo(0, 0);
        });
    });

    /**
     * Handles form submission and validates the last section before submission.
     */
    const assessmentForm = document.getElementById("assessment-form");
    if (assessmentForm) {
        assessmentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const lastInputs = sections[currentSection].querySelectorAll("input[required]");
            if (validateInputs(lastInputs)) {
                // Calculate total score
                let totalScore = 0;
                const allInputs = document.querySelectorAll("input[type='number']");
                allInputs.forEach((input) => {
                    totalScore += parseInt(input.value) || 0;
                });

                // Determine interpretation
                let interpretation = "";
                if (totalScore >= 26) {
                    interpretation = "normal cognitive function.";
                } else if (totalScore >= 20) {
                    interpretation = "mild cognitive impairment.";
                } else if (totalScore >= 10) {
                    interpretation = "moderate cognitive impairment.";
                } else {
                    interpretation = "severe cognitive impairment.";
                }

                // Display results
                const summary = `Your total score is ${totalScore}. This indicates ${interpretation}`;
                localStorage.setItem("resultsSummary", summary);
                window.location.href = "results.html";
            }
        });
    }

    /**
     * Displays the results summary on the results page.
     */
    const resultsSummary = document.getElementById("results-summary");
    if (resultsSummary) {
        const summary = localStorage.getItem("resultsSummary");
        resultsSummary.textContent = summary ? summary : "No results available.";
    }

    /**
     * Handles the opening of the instructions modal.
     */
    if (instructionsBtn) {
        instructionsBtn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    }

    /**
     * Handles the closing of the instructions modal.
     */
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    /**
     * Closes the modal when clicking outside of it.
     */
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    /**
     * Initializes the form by showing only the first section.
     */
    if (sections.length > 0) {
        sections.forEach((section, index) => {
            section.style.display = index === 0 ? "block" : "none";
        });
    }
});
