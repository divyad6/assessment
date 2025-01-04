document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            window.location.href = "disclaimer.html";
        });
    }

    const registrationForm = document.getElementById("registration-form");
    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            window.location.href = "test.html";
        });
    }

    const assessmentForm = document.getElementById("assessment-form");
    if (assessmentForm) {
        assessmentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let score = 0;
            // TODO: replace with real answers
            score += document.getElementById("q1").value === "January 3, 2025" ? 5 : 0;
            score += document.getElementById("q2").value === "Fremont" ? 5 : 0;
            score += document.getElementById("q3").value === "4,7,3" ? 5 : 0;
            score += document.getElementById("q4").value === "20,18,16,14,12,10,8,6,4,2,0" ? 10 : 0;
            score += document.getElementById("q5").value.split(",").length > 5 ? 5 : 0;

            // TODO: replace with real evaluation criteria
            const summary = `Your score is ${score}/30. This indicates ${
                score == 30
                    ? "no signs of dementia."
                :score >= 25
                    ? "mild signs of dementia."
                : score >= 15
                    ? "moderate signs of dementia."
                : "severe signs of dementia."
            }`;

            localStorage.setItem("resultsSummary", summary);
            window.location.href = "results.html";
        });
    }

    const resultsSummary = document.getElementById("results-summary");
    if (resultsSummary) {
        resultsSummary.textContent = localStorage.getItem("resultsSummary");
    }
});
