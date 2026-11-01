// Jede Frage hat eine eindeutige ID und genau eine richtige Antwort (Index ab 0).
export const categories = [
  { id: 'wissen', title: 'Allgemeinwissen', icon: '✦', label: 'QUER DURCH DIE WELT', description: 'Von Geografie bis Kultur: Wie gut kennst du unsere Welt?', color: 'blue' },
  { id: 'wissenschaft', title: 'Natur & Wissenschaft', icon: '◉', label: 'FÜR ENTDECKER', description: 'Große Fragen, kleine Wunder und spannende Fakten.', color: 'green' },
  { id: 'technik', title: 'Digitale Welt', icon: '⌘', label: 'BLEIB NEUGIERIG', description: 'Bits, Browser und die Ideen hinter unserer Technik.', color: 'orange' },
];

export const questions = [
  { id: 'w1', category: 'wissen', text: 'Welche Stadt ist die Hauptstadt von Australien?', answers: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correct: 2, explanation: 'Canberra wurde als Hauptstadt zwischen den konkurrierenden Städten Sydney und Melbourne geplant.' },
  { id: 'w2', category: 'wissen', text: 'Wie viele Ringe hat das olympische Symbol?', answers: ['Vier', 'Fünf', 'Sechs', 'Sieben'], correct: 1, explanation: 'Die fünf miteinander verbundenen Ringe stehen für die Vereinigung der fünf Kontinente.' },
  { id: 'w3', category: 'wissen', text: 'Wer schrieb „Die Verwandlung“?', answers: ['Franz Kafka', 'Thomas Mann', 'Hermann Hesse', 'Friedrich Schiller'], correct: 0, explanation: 'Franz Kafkas Erzählung über Gregor Samsa erschien 1915.' },
  { id: 'w4', category: 'wissen', text: 'Welcher Ozean ist der größte?', answers: ['Atlantischer Ozean', 'Indischer Ozean', 'Arktischer Ozean', 'Pazifischer Ozean'], correct: 3, explanation: 'Der Pazifik bedeckt etwa ein Drittel der gesamten Erdoberfläche.' },
  { id: 'n1', category: 'wissenschaft', text: 'Welches Element hat das chemische Symbol O?', answers: ['Gold', 'Sauerstoff', 'Osmium', 'Silber'], correct: 1, explanation: 'O steht für Oxygenium, den lateinischen Namen für Sauerstoff.' },
  { id: 'n2', category: 'wissenschaft', text: 'Welcher Planet ist der Sonne am nächsten?', answers: ['Venus', 'Erde', 'Mars', 'Merkur'], correct: 3, explanation: 'Merkur ist der innerste Planet und umkreist die Sonne in etwa 88 Erdtagen.' },
  { id: 'n3', category: 'wissenschaft', text: 'Was nehmen Pflanzen bei der Fotosynthese aus der Luft auf?', answers: ['Kohlenstoffdioxid', 'Helium', 'Wasserstoff', 'Neon'], correct: 0, explanation: 'Pflanzen nutzen Licht, Wasser und Kohlenstoffdioxid, um unter anderem Zucker aufzubauen.' },
  { id: 'n4', category: 'wissenschaft', text: 'Wie viele Knochen hat ein erwachsener Mensch typischerweise?', answers: ['106', '156', '206', '306'], correct: 2, explanation: 'Das erwachsene Skelett besteht typischerweise aus 206 Knochen. Die Zahl kann individuell leicht abweichen.' },
  { id: 't1', category: 'technik', text: 'Wofür steht HTML?', answers: ['High Tech Machine Language', 'HyperText Markup Language', 'Home Tool Markup List', 'Hyperlink Transfer Main Logic'], correct: 1, explanation: 'Die HyperText Markup Language beschreibt die Struktur und Bedeutung von Inhalten auf Webseiten.' },
  { id: 't2', category: 'technik', text: 'Wie viele verschiedene Werte kann ein Bit annehmen?', answers: ['Zwei', 'Vier', 'Acht', 'Zehn'], correct: 0, explanation: 'Ein Bit kann die Werte 0 und 1 annehmen. Acht Bits bilden ein Byte.' },
  { id: 't3', category: 'technik', text: 'Wozu dient CSS auf einer Webseite?', answers: ['Zum Speichern von Passwörtern', 'Zum Versenden von E-Mails', 'Zum Gestalten des Aussehens', 'Zum Komprimieren von Dateien'], correct: 2, explanation: 'Cascading Style Sheets legen unter anderem Farben, Abstände, Schriften und Layout fest.' },
  { id: 't4', category: 'technik', text: 'Was bedeutet das S in HTTPS?', answers: ['Simple', 'System', 'Server', 'Secure'], correct: 3, explanation: 'HTTPS ist die durch TLS abgesicherte Variante des HTTP-Protokolls.' },
];
