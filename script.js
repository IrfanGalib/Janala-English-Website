const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-3xl">${word.word}</h2>
        <p class="font-semibold">Meaning /Pronunciation</p>
        <div class="font-bangla text-2xl font-medium text-gray-500">
          "${word.meaning} / ${word.pronunciation}"
        </div>
        <div class="flex justify-between items-center mt-10">
          <button
            class="btn bg-[#1A91FF10] rounded-lg border-none hover:bg-[#1A91FF60]"
          >
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button
            class="btn bg-[#1A91FF10] rounded-lg border-none hover:bg-[#1A91FF60]"
          >
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>`;
    wordContainer.append(card);
  });
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary">
    <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}
    </button>`;
    levelContainer.append(btnDiv);
  }
};
loadLessons();
