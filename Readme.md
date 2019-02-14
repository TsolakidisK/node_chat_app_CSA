
# CSA PROJEKT - TsoHo | ChatApp
#### Teilnehmer Gruppe 20:
Tsolakidis Konstantinos 668285
Dominique Hoyer 671686

#### Beschreibung 
Die TsoHo App ist eine responsive Web Anwendung, die es einem erlaubt mit anderen
Menschen zu kommunizieren.
im Ausgangspunkt der Anwendung kann man einen Namen und einen Raum eingeben und dann im diesem Raum mit anderen Nutzern kommunizieren und die Geographische Position mitteilen.

## Installation
Wenn man die .tar.gz Datei entpackt hat kann man mit folgenden Befehlen das Projekt ausführen.

    npm install
Diesen Befehl muss man im Terminal im Projektwurzelverzeichniss ausführen.
Wenn das gelungen ist führt man den Befehl: 

    npm start
Damit startet die Applikation und läuft auf dem Port:3000 unter dem Link
<http://localhost:3000>. So kann man die Anwendung lokal testen und ausführen.
Wenn man aber die Anwendung online testen möchte , kann man das über <https://limitless-wave-65694.herokuapp.com> diesen Link.

## Testen
Für das Projekt wurden 11 Tests geschrieben, die mit den Befehlen:

    npm test
    npm run test-watch
ausgeführt werden können.
Diese Befehle sind als "Scripts" in der package.json Datei deklariert und werden mit Hilfe 
der Bibliotheken: "expect" und "mocha" ausgeführt.
Nachdem die  Befehle eingegeben wurden , kann man in der Konsole die Ergebnisse der Tests auslesen.

## Stundenabschätzung

### Aufgaben Serverseitiger Teil (Tsolakidis)
**Aufgabebeschreibung (Geplanter Aufwand, Geschätzter Aufwand)
- Nodejs Abhängigkeiten installieren (2, 1)
- Nodejs Projekt erstellen (2, 2)
- Socket.io verstehen und in das Projekt einbinden (6, 8)
- Server Datei Konfigurieren (5, 10)
- Kommunikation Server + Client (15, 12)
- Nachrichten mit jQuery erstellen und anzeigen lassen (10, 15)
- Verbindung mit Google-Api und Abfrage/Mitteilung des Standortes (10, 15)

### Aufgaben Clientseitiger Teil (Hoyer)

- Frontend-Login Page (2, 5)
- Landing Page und style (8, 12)
- Anzeige der aktiven Nutzern (2, 5)
- Anzeige der Nachrichten (5, 5)
- Gestaltung der Nachrichten mit mustache.js  (7, 4)
- Zeitstempel (5, 5)
- Autoscrolling (5, 4)
- Responsives Design (10, 10)
- Google API (10, 10)

### Tests, Dokumentation und Planung (Beide)

- Tests (20, 20)
- Dokumentation(30, 25)
- Planung(40, 30)

### Zusätzliche Aufgaben die während der Entwicklung entstanden sind (Tsolakidis)

- Heroku verstehen/anwenden (3)

### Gesamtsumme
- Tsolakidis 103 Stunden
- Hoyer 99 Stunden


## Dokumentation

Die Dokumentation kann automatisch über npm erstellt werden mit dem Befehl:

    npm run doc

Anschließend wird ein Ordner docs erzeugt, in dem sich die Dokumentationen befinden. Leider wurden in der index.html nicht alle Dokumentation korrekt verlinkt.



