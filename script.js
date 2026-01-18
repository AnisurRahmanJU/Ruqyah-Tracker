let current = 0;
let score = 0;
let activeCategory = "";
let activeQuestions = [];

const data = {
  jinn: {
    title: "🧿 জ্বীনের আছর",
    questions: [
      "হঠাৎ অকারণে ভয় অনুভব করেন?",
      "কেউ যেন নাম ধরে ডাকছে এমন শুনেছেন?",
      "ঘুমের মধ্যে চেপে ধরার অনুভূতি হয়?",
      "কুরআন শুনলে অস্বস্তি লাগে?",
      "ইবাদতের সময় অস্বাভাবিক ক্লান্তি আসে?",
      "অকারণে খুব রাগ হয়?",
      "রাতে অকারণে ঘুম ভেঙে যায়?",
      "দুঃস্বপ্ন নিয়মিত দেখা যায়?",
      "অন্ধকারে কিছু দেখার অনুভূতি হয়?",
      "হঠাৎ বুক ধড়ফড় করে?",
      "নিজেকে একা মনে হয়?",
      "নামাজে মনোযোগ রাখতে কষ্ট হয়?",
      "অকারণে কান্না আসে?",
      "শরীর ভারী লাগে?",
      "মাথার পেছনে ব্যথা থাকে?",
      "পিঠের মাঝখানে ব্যথা অনুভব করেন?",
      "ঘুম থেকে উঠতে কষ্ট হয়?",
      "কোনো অদৃশ্য উপস্থিতি অনুভব হয়?",
      "নিজের উপর নিয়ন্ত্রণ নেই মনে হয়?",
      "হঠাৎ ঠান্ডা বা গরম লাগে?",
      "রাতে ভয় বেশি লাগে?",
      "ইবাদত করতে অনীহা আসে?",
      "অকারণে সন্দেহ হয়?",
      "কুরআন তিলাওয়াত এড়িয়ে চলেন?",
      "কান ঝাঁ ঝাঁ করে?",
      "নিজের মধ্যে পরিবর্তন মনে হয়?",
      "ঘুমে কথা বলেন?",
      "অকারণে শরীর ব্যথা করে?",
      "একাকীত্ব পছন্দ করেন?",
      "অকারণে দুর্বল মনে হয়?"
    ]
  },
  nazar: {
    title: "👁️ বদ নজর",
    questions: [
      "হঠাৎ শরীর দুর্বল হয়ে যায়?",
      "কাজ শুরু করলেই নষ্ট হয়ে যায়?",
      "সব কিছু ভালো চলছিল হঠাৎ খারাপ হয়ে যায়?",
      "মানুষের প্রশংসার পর সমস্যা শুরু হয়?",
      "পরিবারে হঠাৎ অশান্তি আসে?"
    ]
  },
  waswasa: {
    title: "🧠 ওয়াসওয়াসা",
    questions: [
      "একই খারাপ চিন্তা বারবার আসে?",
      "ইবাদতের সময় অপ্রাসঙ্গিক চিন্তা আসে?",
      "অকারণে সন্দেহ তৈরি হয়?",
      "নামাজ ভেঙে ফেলতে ইচ্ছে করে?",
      "অপ্রয়োজনীয় ভয় কাজ করে?"
    ]
  }
};

function startQuiz(category) {
  activeCategory = category;
  activeQuestions = data[category].questions;
  current = 0;
  score = 0;

  document.getElementById("categoryScreen").classList.add("d-none");
  document.getElementById("quizScreen").classList.remove("d-none");
  document.getElementById("categoryTitle").innerText = data[category].title;

  loadQuestion();
}

function loadQuestion() {
  document.getElementById("questionText").innerText = activeQuestions[current];
  document.getElementById("progress").innerText =
    `${current + 1} / ${activeQuestions.length}`;

  loadQuizExtraButtons();
}

function answer(value) {
  score += value;

  setTimeout(() => {
    current++;
    if (current < activeQuestions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 180);
}

function showResult() {
  const percent = (score / (activeQuestions.length * 100)) * 100;

  document.getElementById("quizScreen").innerHTML = `
    <div class="text-center">
      <h4>${data[activeCategory].title}</h4>
      <p class="mt-2">সম্ভাব্য প্রভাব</p>
      <h2 class="text-info">${percent.toFixed(0)}%</h2>
      <hr>
      ${
        percent >= 50
          ? `<p class="text-warning">
              ⚠️ একজন বিশেষজ্ঞ রাকীর পরামর্শ নিন।<br>
              সালাত আদায় করুন এবং আল্লাহর কাছে সাহায্য চান।
            </p>`
          : `<p class="text-success">
              🟢 নিয়মিত যিকর ও ইবাদত চালু রাখুন।
            </p>`
      }
      <p class="disclaimer mt-3">এটি চূড়ান্ত সিদ্ধান্ত নয়</p>
      <div id="quizExtraButtons" class="mt-2 d-flex flex-wrap justify-content-center gap-2"></div>
    </div>
  `;

  loadQuizExtraButtons();
}

// FUNCTION TO SHOW OTHER CATEGORY BUTTONS DURING QUIZ
function showCategoryButtonsInQuiz() {
  const container = document.createElement('div');
  container.className = 'd-flex flex-wrap justify-content-center gap-2';

  for (let key in data) {
    if (key !== activeCategory) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-sm btn-secondary';
      btn.innerText = data[key].title;
      btn.onclick = () => startQuiz(key);
      container.appendChild(btn);
    }
  }

  return container;
}

function loadQuizExtraButtons() {
  const container = document.getElementById('quizExtraButtons');
  if (!container) return;

  container.innerHTML = '';
  const buttons = showCategoryButtonsInQuiz();
  while(buttons.firstChild) {
    container.appendChild(buttons.firstChild);
  }
}
