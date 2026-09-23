# Scheinfasten-Kur · Bilgen & Stephan

Persönlicher 8-Tage-Scheinfastenplan (2.–9. September 2026) als einzelne, statische HTML-Seite.

**Live:** https://stephandel.github.io/scheinfasten/

## Was die Seite kann

- Umschalten zwischen **Bilgen** und **Stephan** — Kontext, Hinweise und Auswärts-Optionen passen sich an
- Horizontal swipebare **Tagesleiste** über alle 8 Tage, aktueller Tag automatisch erkannt und markiert
- **„Heute"-Button** springt direkt zum Tagesplan des echten Datums
- Pro Tag vier Ansichten: Tagesablauf (Timeline mit Uhrzeiten), Selbst kochen (Rezepte), Auswärts (Restaurants mit Preisen/kcal), Tipps
- Aufklappbare Referenz: Sicherheit, Grundlagen, Einkaufsliste, FODMAP, Verlauf, Arbeit
- Auswahl (Person/Tag/Tab) wird in `localStorage` gemerkt

## Heilpilze-Nachschlagewerk

Zweite Seite: https://stephandel.github.io/scheinfasten/heilpilze.html

- 21 in Deutschland kaufbare Heil- und Vitalpilze (Reishi, Shiitake, Coriolus, Austernpilz, Hericium, Cordyceps, Agaricus, Maitake, Chaga, Judasohr, Eichhase, Schopftintling, Silberohr, Phellinus, Poria, Antrodia, Krause Glucke, Enoki, Champignon, Zunderschwamm, Lärchenschwamm)
- Jede Wirkungsaussage einzeln eingestuft: **E** evidenzbasiert (RCT/Meta-Analyse), **F** Forschung (Labor, Tier, Pilotstudie), **T** TCM/Tradition, **S** Sonstige/Marketing
- Punktwert 0–4 für die Humanevidenz insgesamt, Sicherheitshinweise, Dosierung, Inhaltsstoffe, Quellenlinks pro Pilz
- Volltextsuche mit Hervorhebung, Filter nach Anwendungsgebiet und Evidenzstufe, Mindest-Evidenz, Sortierung, Karten- oder Tabellenansicht
- Nachschlageteil: Bewertungsmethode, Einkaufskriterien (Pulver/Extrakt/Myzel), Wechselwirkungen, Rechtslage (Health Claims, Novel Food)

Alle Daten stecken in `MUSHROOMS` und `REFERENCE` im `<script>`-Block von `heilpilze.html`.

## Technik

Zwei statische Dateien, `index.html` und `heilpilze.html`. Kein Build, keine Abhängigkeiten, kein Framework, kein Netzwerkzugriff zur Laufzeit. Läuft überall, wo statische Dateien ausgeliefert werden.

## Inhalte ändern

Alle Inhalte stecken im `<script>`-Block am Ende der Datei:

| Konstante | Inhalt |
|---|---|
| `DAYS` | Die 8 Tage: Datum, kcal-Ziel, Rezepte für Mittag & Abend, personenspezifische Hinweise, Bewegungsempfehlung |
| `STUTTGART` | Restaurants/Gerichte in Feuerbach für Bilgens Dienstreise (Tag 0 & 1) |
| `MANNHEIM` | Optionen für Bilgens Bürotage im Glücksteinquartier |
| `REFERENCE` | Die aufklappbaren Nachschlage-Abschnitte (reines HTML) |
| `timeline()` | Der Tagesablauf mit Uhrzeiten |

Die Erkennung des aktuellen Tages läuft über das Feld `date` (Format `YYYY-MM-DD`) in `DAYS`. Für eine neue Kur einfach die Daten dort anpassen.

## Deployment

GitHub Pages, Branch `main`, Root-Verzeichnis. Nach jedem Push ist die Änderung nach etwa einer Minute live.

## Hinweise

- Die Seite ist über GitHub Pages **öffentlich erreichbar**, auch wenn das Repository privat ist. `noindex` verhindert nur die Indexierung durch Suchmaschinen, keinen Zugriff. Kein Passwortschutz.
- Kalorien- und Preisangaben zu Restaurantgerichten sind Schätzungen bzw. Recherchestand — ohne Gewähr.
- Die Unterlage dient der Orientierung und ersetzt keine ärztliche Beratung.

## Nächste Ausbaustufen

- [ ] Tägliche Morgen-Mail mit dem jeweiligen Tagesplan (GitHub Actions + Cron)
- [ ] Fragebogen zur Erstellung eines individuellen Anforderungsprofils
- [ ] Generator, der aus dem Profil einen eigenen Plan erzeugt
