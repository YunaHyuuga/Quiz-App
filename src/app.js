import { categories, questions } from './questions.js';
import { createQuiz, answerQuestion, nextQuestion, getResult } from './quiz.js';

const main = document.querySelector('#main');
const storageKey = 'quizzeit.best.v1';
let state;
let activeCategory;
let best = {};
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
    best = Object.fromEntries(Object.entries(saved).filter(([key, value]) =>
      categories.some(c => c.id === key) && Number.isInteger(value) && value >= 0 && value <= 100));
  }
} catch { /* Das Quiz funktioniert auch ohne verfügbaren Browserspeicher. */ }

const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
function focusHeading() { main.querySelector('h1')?.focus(); }

function home() {
  state = undefined;
  main.innerHTML = `
    <section class="hero">
      <div><div class="eyebrow"><span class="live-dot"></span> BEREIT FÜR EINEN KLEINEN DENKSPORT?</div>
      <h1 tabindex="-1">Neugier <span>gewinnt.</span></h1>
      <p class="hero-copy">Wie viel weißt du wirklich? Finde es heraus.<br>Ein Thema, vier Fragen und vielleicht ein Aha-Moment.</p>
      <button class="primary" data-action="surprise">Überrasch mich <span class="diagonal-arrow" aria-hidden="true"></span></button>
      <div class="hero-facts"><span><b>3</b> Themenwelten</span><span><b>12</b> Wissensfragen</span><span><b>∞</b> Neugier</span></div></div>
      <div class="hero-art" aria-hidden="true"><span class="orbit orbit-one"></span><span class="orbit orbit-two"></span><span class="spark spark-one">✦</span><span class="spark spark-two">✳</span><div class="question-tile">?</div><div class="art-note"><span>✓</span> Wissen fühlt sich gut an.</div><span class="little-dot"></span></div>
    </section>
    <section class="category-section" aria-labelledby="category-heading"><div class="section-heading"><div><div class="eyebrow">DEIN NÄCHSTER AHA-MOMENT</div><h2 id="category-heading">Worauf hast du Lust?</h2></div><span class="section-note">Such dir deine Herausforderung aus.</span></div>
      <div class="category-grid">${categories.map(c => `<button class="category-card ${c.color}" data-category="${c.id}"><span class="card-top"><span class="category-icon" aria-hidden="true">${c.icon}</span><span class="card-arrow diagonal-arrow" aria-hidden="true"></span></span><span class="eyebrow">${c.label}</span><span class="card-title">${c.title}</span><span class="card-description">${c.description}</span><span class="card-bottom"><span>${questions.filter(q => q.category === c.id).length} Fragen · ca. 2 Min.</span><span>${best[c.id] !== undefined ? `Bestwert ${best[c.id]} %` : 'Los geht’s'}</span></span></button>`).join('')}</div>
    </section><aside class="tip"><span aria-hidden="true">✧</span><p><b>Kein Druck. Nur Neugier.</b> Du bekommst nach jeder Antwort eine Erklärung. Denn hier zählt auch, was du dazulernst.</p></aside>`;
}

function start(id) {
  activeCategory = categories.find(c => c.id === id);
  state = createQuiz(questions.filter(q => q.category === id));
  renderQuestion();
}

function renderQuestion() {
  const q = state.questions[state.index];
  const answered = state.answers.length > state.index;
  const chosen = state.answers[state.index];
  const progress = Math.round(state.answers.length / state.questions.length * 100);
  main.innerHTML = `<section class="play-area"><button class="text-button" data-action="home">← Zur Themenauswahl</button>
    <div class="quiz-meta"><span class="eyebrow">${activeCategory.title}</span><span>Frage ${state.index + 1} von ${state.questions.length}</span></div>
    <progress value="${state.answers.length}" max="${state.questions.length}" aria-label="Beantwortete Fragen">${progress} %</progress>
    <div class="question-panel"><span class="eyebrow">EINE ANTWORT IST RICHTIG</span><h1 tabindex="-1">${escape(q.text)}</h1>
    <div class="answers" role="group" aria-label="Antwortmöglichkeiten">${q.answers.map((answer, i) => `<button data-answer="${i}" class="answer ${answered && i === q.correct ? 'correct' : ''} ${answered && i === chosen && i !== q.correct ? 'wrong' : ''}" ${answered ? 'disabled' : ''}><span class="answer-letter">${String.fromCharCode(65 + i)}</span><span>${escape(answer)}</span>${answered && i === q.correct ? '<span class="answer-mark">✓ <span class="sr-only">Richtige Antwort</span></span>' : answered && i === chosen ? '<span class="answer-mark">✕ <span class="sr-only">Deine Antwort, leider falsch</span></span>' : ''}</button>`).join('')}</div>
    ${answered ? `<div class="feedback" role="status"><b>${chosen === q.correct ? 'Genau richtig!' : 'Wieder etwas gelernt.'}</b><p>${escape(q.explanation)}</p></div><button class="primary next" data-action="next">${state.index === state.questions.length - 1 ? 'Ergebnis ansehen' : 'Nächste Frage'} <span aria-hidden="true">→</span></button>` : '<p class="answer-hint">Wähle deine Antwort aus. Danach erfährst du mehr.</p>'}</div></section>`;
  if (answered) main.querySelector('[data-action="next"]').focus();
  else focusHeading();
}

function renderResult() {
  const result = getResult(state);
  best[activeCategory.id] = Math.max(best[activeCategory.id] ?? 0, result.percent);
  try { localStorage.setItem(storageKey, JSON.stringify(best)); } catch { /* Optionaler Bestwert. */ }
  main.innerHTML = `<section class="result-area"><div class="eyebrow">${activeCategory.title} · GESCHAFFT!</div><div class="result-badge" aria-hidden="true">✦</div><h1 tabindex="-1">${result.percent === 100 ? 'Alles gewusst. Stark!' : result.percent >= 50 ? 'Gut mitgedacht!' : 'Neues Wissen gesammelt.'}</h1><p class="result-copy">Jede Frage macht dich ein bisschen schlauer.</p><div class="score"><strong>${result.correct}<span> / ${result.total}</span></strong><p>richtige Antworten · ${result.percent} %</p></div><div class="result-actions"><button class="primary" data-action="retry">Nochmal spielen <span class="diagonal-arrow" aria-hidden="true"></span></button><button class="secondary" data-action="home">Andere Themen entdecken</button></div><p class="answer-hint">Dein Bestwert in diesem Browser: ${best[activeCategory.id]} %</p>
    <div class="review"><h2>Deine Runde im Überblick</h2>${state.questions.map((q, i) => `<details><summary><span class="review-icon ${state.answers[i] === q.correct ? 'good' : 'bad'}">${state.answers[i] === q.correct ? '✓' : '✕'}</span>${escape(q.text)}</summary><div class="review-content"><p>Deine Antwort: <b>${escape(q.answers[state.answers[i]])}</b></p><p>Richtige Antwort: <b>${escape(q.answers[q.correct])}</b></p><p>${escape(q.explanation)}</p></div></details>`).join('')}</div></section>`;
  focusHeading();
}

main.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.dataset.category) return start(button.dataset.category);
  if (button.dataset.answer !== undefined) {
    state = answerQuestion(state, Number(button.dataset.answer));
    return renderQuestion();
  }
  switch (button.dataset.action) {
    case 'home': home(); focusHeading(); break;
    case 'surprise': start(categories[Math.floor(Math.random() * categories.length)].id); break;
    case 'retry': start(activeCategory.id); break;
    case 'next': state = nextQuestion(state); state.finished ? renderResult() : renderQuestion(); break;
  }
});
home();
