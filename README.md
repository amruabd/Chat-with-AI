# Online Chat mit KI

Ein moderner Chat-Client, der eine Verbindung zu einem lokalen KI-Modell (Ollama) herstellt und Konversationen in deutscher Sprache ermöglicht.

## Features

- Modernes, responsives UI-Design
- Dunkles Farbschema
- Unterstützung für Llama3 und Phi3 Modelle
- Verarbeitung von Nachrichten in Echtzeit
- Tastatursteuerung (Enter zum Senden, Shift+Enter für neue Zeile)
- Automatisches Scrollen zu neuen Nachrichten

## Technische Voraussetzungen

- Ollama muss lokal installiert und ausgeführt werden
- Webbrowser mit JavaScript-Unterstützung
- Lokaler Webserver für das Hosting der Dateien

## Installation

### Option 1: Lokale Installation

1. Installieren Sie Ollama von [ollama.ai](https://ollama.ai)
2. Laden Sie die Projektdateien herunter
3. Starten Sie einen lokalen Webserver im Projektverzeichnis
4. Öffnen Sie `index.html` in Ihrem Browser

### Option 2: Docker Installation

1. Stellen Sie sicher, dass Docker auf Ihrem System installiert ist
2. Starten Sie Ollama in einem Docker Container:
   ```bash
   docker run --rm -v ~/.ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
   ```
3. Öffnen Sie ein neues Terminal-Fenster und laden Sie das Sprachmodell:
   ```bash
   docker exec -it ollama ollama pull llama3.2:1b
   ```
4. Starten Sie einen lokalen Webserver im Projektverzeichnis
5. Öffnen Sie `index.html` in Ihrem Browser

### Docker Container Management

- Container Status überprüfen:
  ```bash
  docker ps
  ```
- Container Logs anzeigen:
  ```bash
  docker logs ollama
  ```
- Container stoppen:
  ```bash
  docker stop ollama
  ```

## Konfiguration

Die KI-Parameter können in der `script.js` angepasst werden

```javascript
const input_data = {
  model: "llama3:latest", // oder "phi3:latest"
  temperature: 0.8, // Kreativität (0.0 - 1.0)
  max_tokens: 100, // Maximale Antwortlänge
  top_p: 0.9, // Token-Wahrscheinlichkeit
  // ... weitere Parameter
};
```

## Verwendung

1. Öffnen Sie die Anwendung im Browser
2. Geben Sie Ihre Nachricht in das Textfeld ein
3. Drücken Sie Enter oder klicken Sie auf den Senden-Button
4. Die KI-Antwort erscheint automatisch im Chat

## Lizenz

MIT Lizenz
