# WE1 Single Page Application (SPA)

Dieses Projekt ist eine einfache **Single Page Application (SPA)** für die Vorlesung *Web Engineering 1*.  
Die Anwendung besteht aus einem TypeScript-Frontend und einem durch meinen Dozenten bereitgestellten Express-Backend. -> klinski@bht-berlin.de

## Features

### Frontend
- Single Page Application ohne Seitenreload
- Login & Signup
- Startseite für eingeloggte Nutzer
- User Management (CRUD)
  - Nutzer anzeigen
  - Nutzer anlegen
  - Nutzer bearbeiten
  - Nutzer löschen
- Impressum (mit und ohne Login)
- Navigation über Page Object Model (POM)
- Styling mit **Bootstrap 5**

### Backend
- REST-API für Benutzerverwaltung
- Login mit **HTTP Basic Auth**
- In-Memory User-Verwaltung (keine Datenbank)

## Nutzung

### Voraussetzungen
- Node.js
- Browser

### Starten
```bash
npm install
npm start
