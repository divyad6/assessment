document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".question-section");

    const instructionsBtn = document.getElementById("instructions-btn");
    const modal = document.getElementById("instructions-modal");

    const worldExamples = document.getElementById("world-examples");
    const world_modal = document.getElementById("world-modal");

    const watch = document.getElementById("watch");
    const watch_modal = document.getElementById("watch-modal");

    const pencil = document.getElementById("pencil");
    const pencil_modal = document.getElementById("pencil-modal");

    const eyes = document.getElementById("eyes");
    const eyes_modal = document.getElementById("eyes-modal");

    const figures = document.getElementById("figures");
    const figures_modal = document.getElementById("figures-modal");

    const startBtn = document.getElementById("start-btn");
    const instrPage = document.getElementById("instruction-page");

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
     * Redirects from the disclaimer page to the instructions page.
     */
    const InstrBtns = document.querySelectorAll(".instr-btn");
    InstrBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            window.location.href = "instructions.html";
        });
    });

    /**
     * Redirects from section 1 back to the instructions.
     */
    const backToInstructionBtns = document.querySelectorAll(".back-instr-btn");
    backToInstructionBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            window.location.href = "instructions.html";
        });
    });

    /**
     * Redirects from instructions back to the disclaimer page.
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
     * Redirects from instruction page to the test page.
     */
    if (instrPage) {
        instrPage.addEventListener("submit", (e) => {
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
                // calculate total score
                let totalScore = 0;
                const allInputs = document.querySelectorAll("input[type='number']");
                allInputs.forEach((input) => {
                    totalScore += parseInt(input.value) || 0;
                });

                // determine interpretation
                let interpretation = "";
                if (totalScore >= 26) {
                    interpretation = "likely normal cognitive function.";
                } else if (totalScore >= 20) {
                    interpretation = "mild cognitive impairment.";
                } else if (totalScore >= 10) {
                    interpretation = "moderate cognitive impairment.";
                } else {
                    interpretation = "severe cognitive impairment.";
                }

                const summary = `Your total score is ${totalScore}. This indicates ${interpretation}`;
                localStorage.setItem("resultsSummary", summary);
                window.location.href = "results.html";
            }
        });
    }

    // Restrict user input to min max values for each score
    document.querySelectorAll('input[type="number"]').forEach((input) => {
        input.addEventListener("input", (e) => {
            const max = parseInt(input.max, 10);
            const value = parseInt(input.value, 10); 
    
            if (value > max) {
                input.value = max; // restrict value to the max allowed
            } else if (value < 0 || isNaN(value)) {
                input.value = 0; // reset to min value if below 0 or invalid
            }
        });
    });

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
     * Handles the opening of the world scoring examples modal.
     */
    if (worldExamples) {
        worldExamples.addEventListener("click", () => {
            world_modal.style.display = "flex";
        });
    }

    /**
     * Handles the opening of the watch modal.
     */
    if (watch) {
        watch.addEventListener("click", () => {
            if (watch_modal) watch_modal.style.display = "flex";
        });
    }

    /**
     * Handles the opening of the pencil modal.
     */
    if (pencil) {
        pencil.addEventListener("click", () => {
            if (pencil_modal) pencil_modal.style.display = "flex";
        });
    }

    /**
     * Handles the opening of the "close your eyes" modal.
     */
    if (eyes) {
        eyes.addEventListener("click", () => {
            if (eyes_modal) eyes_modal.style.display = "flex";
        });
    }

    /**
     * Handles the opening of the intersecting figures modal.
     */
    if (figures) {
        figures.addEventListener("click", () => {
            if (figures_modal) figures_modal.style.display = "flex";
        });
    }

    /**
     * Handles the close buttons for modals.
     */
    const closeBtns = document.querySelectorAll(".close-btn");
    closeBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const modal = btn.closest(".modal");
            if (modal) modal.style.display = "none";
        });
    });

    /**
     * Closes modals when clicking outside of it.
     */
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
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
