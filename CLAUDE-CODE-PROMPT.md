# Prompt für Claude Code

Kopiere den folgenden Text in Claude Code. Lege vorher `index.html` und `README.md` in ein leeres lokales Verzeichnis und starte Claude Code dort.

---

Ich möchte die Datei `index.html` in diesem Verzeichnis als GitHub Page veröffentlichen. Bitte richte das komplett ein.

**Was zu tun ist:**

1. Prüfe, ob `git` und die GitHub CLI (`gh`) installiert und authentifiziert sind. Falls `gh` nicht angemeldet ist, sag mir Bescheid statt es zu erraten.
2. Initialisiere hier ein Git-Repository, falls noch keines existiert.
3. Erstelle eine sinnvolle `.gitignore` (macOS `.DS_Store`, Editor-Verzeichnisse).
4. Lege ein neues GitHub-Repository namens `scheinfasten` an. Mach es **public** — GitHub Pages ist ohnehin öffentlich erreichbar, und ein privates Repo würde hier nur eine Sicherheit vortäuschen, die es nicht gibt.
5. Committe `index.html` und `README.md` und pushe auf `main`.
6. Aktiviere GitHub Pages für Branch `main`, Root-Verzeichnis (`/`).
7. Warte, bis der erste Deploy durch ist, und prüfe mit einem HTTP-Request, ob die Seite tatsächlich ausgeliefert wird (Status 200 und der Titel „Scheinfasten-Kur" im HTML).
8. Gib mir am Ende die fertige URL aus und trage sie in der `README.md` unter **Live:** ein — dann committe und pushe diese eine Änderung nach.

**Wichtig:**

- `index.html` ist eine einzelne, vollständig eigenständige Datei ohne Build-Schritt und ohne externe Abhängigkeiten. Baue keine Toolchain, kein npm, keinen Bundler und keinen Static-Site-Generator drumherum. Nicht umstrukturieren, nicht in Komponenten zerlegen.
- Ändere den Inhalt der HTML-Datei nicht. Falls dir inhaltlich etwas auffällt, sag es mir, statt es selbst zu korrigieren.
- Nutze `gh` für alles, was GitHub betrifft, statt mir Klick-Anleitungen für die Weboberfläche zu geben.

Wenn das läuft, erklär mir bitte in zwei, drei Sätzen, wie ich künftig eine Änderung an der Seite live bekomme.

---

## Optionaler zweiter Schritt: tägliche Morgen-Mail

Erst starten, wenn die Seite läuft. Dann als separaten Prompt:

---

Baue mir in diesem Repository einen GitHub-Actions-Workflow, der werktags morgens um 6:00 Uhr deutscher Zeit eine E-Mail mit dem Tagesplan des aktuellen Tages verschickt.

**Anforderungen:**

- Die Tagesdaten stehen bereits in `index.html` in der JavaScript-Konstante `DAYS` (jeder Eintrag hat `date`, `type`, `kcal`, `lede`, `mittag`, `abend`, `note`, `move`). Extrahiere sie beim Workflow-Lauf daraus, statt die Inhalte ein zweites Mal zu pflegen — sonst laufen Seite und Mail auseinander.
- Der Workflow sucht den Eintrag, dessen `date` dem heutigen Datum entspricht. Gibt es keinen (Kur läuft nicht), wird **keine** Mail verschickt und der Job endet sauber.
- Zwei Empfänger, die Mail ist personalisiert: jeweils der passende `note`-Text für Bilgen bzw. Stephan.
- Mailversand über SMTP mit Zugangsdaten aus GitHub Secrets. Lege die Secrets nicht selbst an — sag mir, welche du brauchst und wie ich sie setze.
- Beachte, dass GitHub-Cron in UTC läuft und die Ausführungszeit nicht garantiert ist; Verzögerungen von 10–30 Minuten sind normal. Weise mich darauf hin, statt es zu kaschieren.
- Halte den Workflow schlicht: ein Skript, wenige Abhängigkeiten, gut lesbar.

Zeig mir den Workflow erst zur Durchsicht, bevor du ihn committest.
