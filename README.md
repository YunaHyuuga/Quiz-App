# Quizzeit

Eine lauffähige Blaupause für eine deutschsprachige Quiz-App. Responsive Oberfläche, drei Themenwelten, zwölf Beispielfragen, direktes Antwortfeedback und eine Ergebnisübersicht. Bestwerte werden ausschließlich im lokalen Browser gespeichert. Keine Anmeldung, kein Backend, keine externen Fonts oder Laufzeit-Abhängigkeiten.

## Lokal starten

Voraussetzung: Node.js ab Version 22 (CI: Node.js 24). Eine Paketinstallation ist nicht nötig.

```sh
cd /workspace/Quiz-App
npm run dev
```

Der Entwicklungsserver verwendet Port 5173. Ein anderer Port lässt sich mit `PORT=3000 npm run dev` wählen. Zum Beenden `Strg+C` drücken. Der Server bindet an `0.0.0.0`; er dient der Entwicklung und ist kein Produktionsserver.

```sh
npm test          # Spiellogik und Konsistenz der Fragen prüfen
npm run build    # statische Dateien in dist/ erzeugen
npm run preview  # den Build auf Port 5173 prüfen
```

Für den Betrieb können die Inhalte von `dist/` bei einem statischen Hostinganbieter veröffentlicht werden. Die App erwartet die Domainwurzel `/`; Hosting in einem Unterverzeichnis benötigt angepasste Asset-Pfade. Die Tests laufen bei Push und Pull Request auch in GitHub Actions.

## Aufbau

| Datei | Aufgabe |
| --- | --- |
| `src/questions.js` | Kategorien, Fragen, richtige Antworten und Erklärungen |
| `src/quiz.js` | Unabhängige Spiellogik mit validierten Zustandsübergängen |
| `src/app.js` | Navigation, Darstellung und optionaler lokaler Bestwert |
| `src/styles.css` | Responsive Gestaltung und Fokuszustände |
| `scripts/` | Entwicklungsserver und statischer Build |
| `tests/quiz.test.js` | Tests mit dem integrierten Node-Testframework |

## Eigene Inhalte ergänzen

Neue Kategorien in `categories` anlegen und Fragen mit passender `category` in `questions` ergänzen. Jede Frage braucht eine eindeutige `id`, einen `text`, mindestens zwei `answers`, den nullbasierten Index `correct` und eine `explanation`. Beispiel:

```js
{
  id: 'w5',
  category: 'wissen',
  text: 'Wie viele Minuten hat eine Stunde?',
  answers: ['30', '60', '90', '120'],
  correct: 1,
  explanation: 'Eine Stunde besteht aus 60 Minuten.'
}
```

Anschließend `npm test` ausführen. Die Fragen einer Kategorie werden in ihrer definierten Reihenfolge gespielt. „Überrasch mich“ wählt eine zufällige Kategorie. Die Startseite beschreibt die aktuellen Beispieldaten; ihre Kennzahlen und Texte bei größeren Inhaltsänderungen mit anpassen.

## Bewusster Umfang der Blaupause

- Eine richtige Antwort pro Frage; keine Zeitbegrenzung.
- Antworten lassen sich nach der Auswahl nicht ändern. Die Themenauswahl bricht die laufende Runde ab.
- Bestwerte gelten pro Browser und Kategorie. Ohne verfügbaren Browserspeicher funktioniert das Quiz weiterhin; eine angefangene Runde wird nach Neuladen zurückgesetzt.
- Richtige Antworten liegen im Frontend. Für Prüfungen, manipulationssichere Ranglisten oder gemeinsame Konten braucht es ein Backend mit serverseitiger Auswertung.
- Sinnvolle nächste Ausbauschritte: mehr Fragen, Schwierigkeitsgrade, zufällige Fragenauswahl, Backend und Benutzerprofile.

Für Cloud-Aufgaben den bestehenden Checkout verwenden; kein zusätzliches Git-Worktree erforderlich. Es werden keine API-Schlüssel oder Datenbankdienste benötigt.
