export function validateQuestions(questions) {
  if (!Array.isArray(questions) || questions.length === 0) throw new Error('Das Quiz braucht mindestens eine Frage.');
  const ids = new Set();
  for (const q of questions) {
    if (!q.id || ids.has(q.id) || typeof q.text !== 'string' || !q.text.trim() ||
      !Array.isArray(q.answers) || q.answers.length < 2 ||
      q.answers.some(a => typeof a !== 'string' || !a.trim()) ||
      !Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.answers.length) {
      throw new Error('Ungültige Frage oder doppelte ID.');
    }
    ids.add(q.id);
  }
}

export function createQuiz(questions) {
  validateQuestions(questions);
  return { questions: structuredClone(questions), index: 0, answers: [], finished: false };
}

export function answerQuestion(state, answer) {
  const question = state.questions[state.index];
  if (state.finished || state.answers.length > state.index) throw new Error('Diese Frage wurde bereits beantwortet.');
  if (!Number.isInteger(answer) || answer < 0 || answer >= question.answers.length) throw new Error('Ungültige Antwort.');
  return { ...state, answers: [...state.answers, answer] };
}

export function nextQuestion(state) {
  if (state.finished || state.answers.length <= state.index) throw new Error('Bitte zuerst antworten.');
  return state.index === state.questions.length - 1
    ? { ...state, finished: true }
    : { ...state, index: state.index + 1 };
}

export function getResult(state) {
  const correct = state.answers.filter((answer, i) => answer === state.questions[i].correct).length;
  return { correct, total: state.questions.length, percent: Math.round(correct / state.questions.length * 100) };
}
