import test from 'node:test';
import assert from 'node:assert/strict';
import { categories, questions } from '../src/questions.js';
import { createQuiz, answerQuestion, nextQuestion, getResult, validateQuestions } from '../src/quiz.js';

test('Alle Kategorien haben gültige Fragen ohne doppelte IDs', () => {
  validateQuestions(questions);
  assert.equal(new Set(categories.map(c => c.id)).size, categories.length);
  for (const c of categories) assert.ok(questions.some(q => q.category === c.id));
  for (const q of questions) {
    assert.ok(categories.some(c => c.id === q.category));
    assert.ok(q.explanation.trim());
    assert.equal(new Set(q.answers).size, q.answers.length);
  }
});

test('Eine komplette Runde bewertet richtige und falsche Antworten und endet nach der letzten Frage', () => {
  const selected = questions.filter(q => q.category === 'wissen');
  let state = createQuiz(selected);
  for (let i = 0; i < selected.length; i++) {
    assert.equal(state.index, i);
    assert.equal(state.finished, false);
    state = answerQuestion(state, i === 0 ? (selected[i].correct + 1) % 4 : selected[i].correct);
    state = nextQuestion(state);
  }
  assert.equal(state.finished, true);
  assert.deepEqual(getResult(state), { correct: 3, total: 4, percent: 75 });
  assert.throws(() => answerQuestion(state, 0));
  assert.throws(() => nextQuestion(state));
});

test('Nicht beantwortete Fragen können nicht übersprungen oder doppelt gewertet werden', () => {
  const state = createQuiz(questions);
  assert.throws(() => nextQuestion(state));
  for (const value of [-1, 4, 0.5, NaN, '1']) assert.throws(() => answerQuestion(state, value));
  const answered = answerQuestion(state, 0);
  assert.throws(() => answerQuestion(answered, 1));
  assert.equal(state.answers.length, 0);
});

test('Neustart setzt Fortschritt zurück und verändert die Fragenquelle nicht', () => {
  const first = createQuiz(questions);
  first.questions[0].answers[0] = 'Verändert';
  const fresh = createQuiz(questions);
  assert.notEqual(fresh.questions[0].answers[0], 'Verändert');
  assert.deepEqual(fresh.answers, []);
  assert.equal(fresh.index, 0);
  assert.equal(fresh.finished, false);
});

test('Ungültige und leere Fragen werden vor Spielstart abgelehnt', () => {
  assert.throws(() => createQuiz([]));
  assert.throws(() => createQuiz([questions[0], questions[0]]));
  assert.throws(() => createQuiz([{ ...questions[0], correct: 9 }]));
  assert.throws(() => createQuiz([{ ...questions[0], answers: [''] }]));
});

test('Alle richtigen und alle falschen Antworten liefern die Grenzwerte 100 und 0 Prozent', () => {
  for (const allCorrect of [true, false]) {
    let state = createQuiz(questions);
    for (const q of questions) {
      state = nextQuestion(answerQuestion(state, allCorrect ? q.correct : (q.correct + 1) % q.answers.length));
    }
    assert.equal(getResult(state).percent, allCorrect ? 100 : 0);
  }
});
