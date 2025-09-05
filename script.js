const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};
const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  console.log(word);

  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
  <div>
    <h2 class="text-2xl font-bold">${
      word.word
    } (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
  </div>

  <div>
    <h2 class="font-bold">Meaning</h2>
    <p>${word.meaning}</p>
  </div>

  <div>
    <h2 class="font-bold">Example</h2>
    <p>${word.sentence}</p>
  </div>

  <div>
    <h2 class="font-bold">Synonyms</h2>
    <div class="">${createElements(word.synonyms)}</div>
  </div>`;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full pt-6 pb-6">
    <img class='mx-auto mb-4' src='./assets/alert-error.png'>
        <p class="font-bangla text-[#79716B] mb-4">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h1 class="font-bangla text-3xl">নেক্সট Lesson এ যান</h1>
      </div>`;
    manageSpinner(false);
    return;
  }
  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-3xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold">Meaning /Pronunciation</p>
        <div class="font-bangla text-2xl font-medium text-gray-500">
          "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${
      word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"
    }"
        </div>
        <div class="flex justify-between items-center mt-10">

          <button onClick="loadWordDetail(${word.id})"
            class="btn bg-[#1A91FF10] rounded-lg border-none hover:bg-[#1A91FF60]">
            <i class="fa-solid fa-circle-info"></i>
          </button>

          <button onClick="pronounceWord('${word.word}')"
            class="btn  bg-[#1A91FF10] rounded-lg border-none hover:bg-[#1A91FF60]">
            <i class="fa-solid fa-volume-high"></i>
          </button>

        </div>
      </div>`;
    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
    </button>`;
    levelContainer.append(btnDiv);
  }
};

loadLessons();
