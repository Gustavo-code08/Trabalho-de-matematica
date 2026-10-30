const select = document.getElementById("eventSelect");
const faces = document.getElementById("faces");
const setEvent = document.getElementById("setEvent");
const chance = document.getElementById("chance");
const eventExplain = document.getElementById("eventExplain");

const events = {
  par: { good:[2,4,6], set:"Evento A = {2, 4, 6}", chance:"Probabilidade: 3/6 = 50%", explain:"Três dos seis resultados possíveis são favoráveis." },
  impar: { good:[1,3,5], set:"Evento B = {1, 3, 5}", chance:"Probabilidade: 3/6 = 50%", explain:"Os resultados ímpares são 1, 3 e 5." },
  maior4: { good:[5,6], set:"Evento C = {5, 6}", chance:"Probabilidade: 2/6 ≈ 33,33%", explain:"Apenas 5 e 6 são maiores que 4." },
  cinco: { good:[5], set:"Evento D = {5}", chance:"Probabilidade: 1/6 ≈ 16,67%", explain:"Há um resultado favorável entre seis possíveis." },
  certo: { good:[1,2,3,4,5,6], set:"Evento E = {1, 2, 3, 4, 5, 6}", chance:"Probabilidade: 6/6 = 100%", explain:"É um evento certo: todos os resultados do dado servem." },
  impossivel: { good:[], set:"Evento F = ∅ (conjunto vazio)", chance:"Probabilidade: 0/6 = 0%", explain:"É impossível sair 7 em um dado comum de seis faces." }
};

function updateSimulator() {
  const event = events[select.value];
  faces.innerHTML = "";
  for (let n = 1; n <= 6; n++) {
    const face = document.createElement("span");
    face.textContent = n;
    if (event.good.includes(n)) face.classList.add("selected");
    faces.appendChild(face);
  }
  setEvent.textContent = event.set;
  chance.textContent = event.chance;
  eventExplain.textContent = event.explain;
}
select.addEventListener("change", updateSimulator);
updateSimulator();

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => menu.classList.remove("open")));

document.getElementById("quizForm").addEventListener("submit", event => {
  event.preventDefault();
  const correct = {q1:"b", q2:"a", q3:"c", q4:"b"};
  let score = 0;
  let answered = 0;
  for (const [question, answer] of Object.entries(correct)) {
    const chosen = document.querySelector(`input[name="${question}"]:checked`);
    if (chosen) {
      answered++;
      if (chosen.value === answer) score++;
    }
  }
  const output = document.getElementById("quizResult");
  if (answered < 4) {
    output.textContent = `Você respondeu ${answered} de 4 perguntas. Responda a todas para ver sua pontuação.`;
  } else {
    output.textContent = `Você acertou ${score} de 4 perguntas! ` +
      (score === 4 ? "Excelente! Você dominou o conteúdo!" :
       score >= 2 ? "Muito bem! Revise as explicações e tente novamente." :
       "Continue estudando e tente novamente. Você consegue!");
  }
});
