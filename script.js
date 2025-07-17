
// JavaScript code to render questions, paginate, and show results
let currentPage = 0;
const questionsPerPage = 10;

function renderQuestions() {
    const container = document.getElementById("questionnaire");
    container.innerHTML = "";
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    const currentQuestions = questions.slice(start, end);

    currentQuestions.forEach((q, i) => {
        const qIndex = start + i + 1;
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `
            <p><strong>${qIndex}. ${q.text}</strong></p>
            <label><input type="radio" name="q${qIndex}" value="-3" required> کاملاً مخالفم</label>
            <label><input type="radio" name="q${qIndex}" value="-2"> مخالفم</label>
            <label><input type="radio" name="q${qIndex}" value="-1"> کمی مخالفم</label>
            <label><input type="radio" name="q${qIndex}" value="0"> خنثی</label>
            <label><input type="radio" name="q${qIndex}" value="1"> کمی موافقم</label>
            <label><input type="radio" name="q${qIndex}" value="2"> موافقم</label>
            <label><input type="radio" name="q${qIndex}" value="3"> کاملاً موافقم</label>
            <hr>
        `;
        container.appendChild(wrapper);
    });

    document.getElementById("submitSection").style.display = currentPage === 5 ? "block" : "none";
}

function nextPage() {
    if (validatePage()) {
        if (currentPage < 5) {
            currentPage++;
            renderQuestions();
        }
    } else {
        alert("لطفاً به همه سوالات این صفحه پاسخ دهید.");
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        renderQuestions();
    }
}

function validatePage() {
    const start = currentPage * questionsPerPage + 1;
    const end = start + questionsPerPage;
    for (let i = start; i < end; i++) {
        const options = document.getElementsByName("q" + i);
        if (![...options].some(opt => opt.checked)) return false;
    }
    return true;
}

function submitAnswers() {
    // Dummy score to type mapping for now (real logic would need MBTI scoring)
    const resultBox = document.getElementById("result");
    const type = "INTJ";
    resultBox.innerHTML = `تیپ شخصیتی شما: <strong>${type}</strong><br><a href="\${mbtiLinks[type]}" target="_blank">مشاهده کتابک مربوط به ${type}</a>`;
}
