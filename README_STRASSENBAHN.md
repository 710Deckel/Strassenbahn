# 🚊 Straßenbahnsignale Deutschland

Vollständige Datenbank aller Straßenbahn-, Stadtbahn- und Oberleitungsbus-Signale in Deutschland nach BOStrab (Straßenbahn-Bau- und Betriebsordnung).

## 📦 Verfügbare Dateien

### JSON-Datenbanken

| Datei | Größe | Signale | Inhalt |
|-------|-------|---------|--------|
| `strassenbahnsignale_komplett.json` | 20.5 KB | 47 | Vollständige Datenbank mit Beschreibungen, Farben, Symbolen, Zusatzinfos |
| `strassenbahnsignale_master.json` | 10.2 KB | 47 | Grundinformationen (Kurzzeichen, Bezeichnung, Bedeutung, Symbol, Farbe) |
| `strassenbahnsignale_expert.json` | 4.9 KB | 47 | Kompakte Version (nur Kurzzeichen und Bezeichnung) |

### SVG-Bilder

Alle Signalbilder als SVG-Dateien im `images/` Ordner.

---

## 📊 Signal-Kategorien

| Kategorie | Anzahl | Beispiele |
|-----------|--------|-----------|
| **Fahrsignale** | 6 | F 0 (Halt), F 1 (Geradeaus), F 5 (Permissivsignal) |
| **Weichensignale** | 8 | W 0 (Gesperrt), W 1-3 (ohne Verschluss), W 11-13 (verschlossen) |
| **Streckensignale** | 8 | St 1-2 (Ein-/Ausschalten), St 3-6 (Bügel/Fahrdraht), St 7-8 |
| **Sondersignale** | 6 | So 1-4 (Kennzeichnung), So 5-6 (Begegnungsverbot) |
| **Hauptsignale** | 2 | H 0 (Halt), H 1 (Fahrt) |
| **Vorsignale** | 2 | V 0 (Halt erwarten), V 1 (Fahrt erwarten) |
| **Geschwindigkeitssignale** | 3 | G 1 (Ankündigung), G 2 (Beginn), G 2a (Obus) |
| **Abfahrsignale** | 2 | A 1 (Türen schließen), A 2b (Abfahren) |
| **Historisch DDR** | 3 | St 9, St 10, St 11 |
| **Regional** | 7 | H 2-4, Bü 1-2, St 9a/9b (HAL) |

**Gesamt: 47 Signale**

---

## 🔧 Verwendung

### React/JavaScript App

```javascript
import signaleData from './strassenbahnsignale_master.json';

// Alle Fahrsignale
const fahrsignale = signaleData.signale.filter(
  s => s.kategorie === 'Fahrsignale'
);

// Signal nach Kurzzeichen finden
const f0 = signaleData.signale.find(s => s.kurzzeichen === 'F 0');
console.log(f0.bedeutung); // "Halt"

// Signal-Bild anzeigen
function SignalCard({ kurzzeichen }) {
  const signal = signaleData.signale.find(s => s.kurzzeichen === kurzzeichen);
  
  return (
    <div className="signal-card">
      <img src={`images/Signal_${kurzzeichen.replace(' ', '_')}.svg`} 
           alt={signal.bezeichnung} />
      <h3>{signal.kurzzeichen}</h3>
      <p>{signal.bezeichnung}</p>
      <span className="kategorie">{signal.kategorie}</span>
    </div>
  );
}
```

### Python

```python
import json

# JSON laden
with open('strassenbahnsignale_komplett.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Alle Signale durchgehen
for signal in data['signale']:
    print(f"{signal['kurzzeichen']}: {signal['bezeichnung']}")
    
# Nach Kategorie filtern
fahrsignale = [s for s in data['signale'] if s['kategorie'] == 'Fahrsignale']
```

---

## 📋 Datenstruktur

### strassenbahnsignale_komplett.json (Vollständig)

```json
{
  "meta": {
    "version": "1.0",
    "titel": "Straßenbahnsignale Deutschland - Vollständige Datenbank",
    "quelle": "Wikipedia - Straßenbahnsignale in Deutschland",
    "url": "https://de.wikipedia.org/wiki/Straßenbahnsignale_in_Deutschland",
    "datum": "2025-12-26",
    "beschreibung": "Vollständige Sammlung aller Signale nach BOStrab",
    "regelwerk": "BOStrab (Straßenbahn-Bau- und Betriebsordnung)"
  },
  "anzahl": 47,
  "kategorien": {
    "Fahrsignale": 6,
    "Weichensignale": 8,
    ...
  },
  "signale": [
    {
      "kurzzeichen": "F 0",
      "bezeichnung": "Halt",
      "bedeutung": "Halt",
      "kategorie": "Fahrsignale",
      "beschreibung": "Das Haltesignal zeigt einen weißen Querbalken...",
      "farbe": "Weiß",
      "symbol": "Querbalken (horizontal)",
      "zusatzinfo": "Entspricht dem roten Licht bei normalen Ampeln..."
    }
  ]
}
```

### strassenbahnsignale_master.json (Grundinformationen)

```json
{
  "signale": [
    {
      "kurzzeichen": "F 0",
      "bezeichnung": "Halt",
      "bedeutung": "Halt",
      "kategorie": "Fahrsignale",
      "symbol": "Querbalken (horizontal)",
      "farbe": "Weiß"
    }
  ]
}
```

### strassenbahnsignale_expert.json (Kompakt)

```json
{
  "signale": [
    {
      "kurzzeichen": "F 0",
      "bezeichnung": "Halt",
      "kategorie": "Fahrsignale"
    }
  ]
}
```

---

## 🎨 Balkensignale - Besonderheiten

Die **Fahrsignale (F 0 - F 5)** sind Balkensignale und unterscheiden sich von normalen Ampeln:

| Signal | Normale Ampel | Balkensignal |
|--------|---------------|--------------|
| **Halt** | Rotes Licht 🔴 | Weißer Querbalken ⬜➖ |
| **Freigabe** | Grüner Pfeil 🟢➡️ | Weißer Balken (senkrecht/schräg) ⬜⬆️ |
| **Übergang** | Gelbes Licht 🟡 | Weißer Kreis ⬜⚪ |
| **Vorsicht** | Gelbes Blinken ⚠️ | Weißes Dreieck ⬜🔻 |

**Wichtig:** Durch diese Unterschiede sind Balkensignale mit übrigen Lichtzeichen unverwechselbar und speziell für Straßenbahnen erkennbar.

---

## 🚦 Signal-Kombinationen

### Beispiel: Signalanlage an Kreuzung

```
┌─────────────┐
│ "Signal     │  ← St 7 (Signal kommt)
│  kommt"     │
├─────────────┤
│      ━      │  ← F 0 (Halt)
├─────────────┤
│      ⚪      │  ← F 4 (Halt zu erwarten)
├─────────────┤
│      ↑      │  ← F 1 (Geradeaus frei)
└─────────────┘
```

Diese Signalanlage zeigt:
- **Oben:** Signal kommt (Ankündigung)
- **Dann:** Aktuell Halt (F 0)
- **Dann:** Halt erwarten (F 4) - Übergang
- **Unten:** Nächstes Signal wird F 1 sein

---

## 📖 Rechtliche Grundlagen

### BOStrab - Straßenbahn-Bau- und Betriebsordnung

- **§ 65 Abs. 3 BOStrab:** Regionale Abweichungen sind zulässig, sofern die Technische Aufsichtsbehörde keine Änderung verlangt hat
- **Haupt- und Vorsignale:** Entsprechen dem H/V-Signalsystem der Eisenbahn
- **Fahrleitungssignale St 3-6 und St 8:** Entsprechen El 1, 2, 4-6 des Eisenbahn-Signalbuchs

### Historische DDR-Signale

Gemäß örtlicher **Dienstvorschriften für den Fahrverkehr (DF)** in ostdeutschen Bundesländern bleiben die alten DDR-Signale **St 9-11** parallel zu den neuen BOStrab-Signalen gültig.

### Regionale Besonderheiten

- **Düsseldorf/Duisburg:** H 2 (Fahrt frei abzweigend)
- **Bielefeld/Bonn/Rhein-Ruhr:** H 3, H 4
- **Halle (Saale):** St 9a, St 9b (spezielle Haltepunkttafeln mit Höhenangaben)
- **München:** Abweichende Bedeutung von A 2b als Vorsignal

---

## 🔍 Suche und Filter

### Nach Kategorie suchen

```javascript
const kategorien = [
  'Fahrsignale',
  'Weichensignale',
  'Streckensignale',
  'Hauptsignale',
  'Vorsignale',
  'Geschwindigkeitssignale',
  'Abfahrsignale',
  'Sondersignale',
  'Historisch DDR',
  'Regional'
];

function getSignaleByKategorie(kategorie) {
  return signaleData.signale.filter(s => s.kategorie === kategorie);
}
```

### Nach Farbe suchen

```javascript
// Alle weißen Signale
const weisse = signaleData.signale.filter(s => 
  s.farbe && s.farbe.includes('Weiß')
);

// Alle gelben Signale
const gelbe = signaleData.signale.filter(s => 
  s.farbe && s.farbe.includes('Gelb')
);
```

### Regional filtern

```javascript
// Nur Halle-spezifische Signale
const halle = signaleData.signale.filter(s => 
  s.regional && s.regional.includes('Halle')
);

// Nur BOStrab-Standard (keine regionalen)
const standard = signaleData.signale.filter(s => 
  !s.regional || s.regional === ''
);
```

---

## 🎯 Quiz-Funktion

```javascript
function SignalQuiz() {
  const [currentSignal, setCurrentSignal] = useState(null);
  const [options, setOptions] = useState([]);
  
  function generateQuestion() {
    // Zufälliges Signal wählen
    const signal = signaleData.signale[
      Math.floor(Math.random() * signaleData.signale.length)
    ];
    
    // 3 falsche Antworten + 1 richtige
    const wrongAnswers = signaleData.signale
      .filter(s => s.kurzzeichen !== signal.kurzzeichen)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(s => s.bezeichnung);
    
    const allOptions = [
      signal.bezeichnung,
      ...wrongAnswers
    ].sort(() => Math.random() - 0.5);
    
    setCurrentSignal(signal);
    setOptions(allOptions);
  }
  
  return (
    <div className="quiz">
      <h2>Was bedeutet dieses Signal?</h2>
      <img src={`images/Signal_${currentSignal.kurzzeichen.replace(' ', '_')}.svg`} />
      <div className="options">
        {options.map(opt => (
          <button onClick={() => checkAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## 📱 App-Integration

### PWA-Struktur

```
Strassenbahn/
├── images/               # SVG-Signalbilder
│   ├── Signal_F_0.svg
│   ├── Signal_F_1.svg
│   └── ...
├── strassenbahnsignale_komplett.json
├── strassenbahnsignale_master.json
├── strassenbahnsignale_expert.json
└── README.md
```

### Service Worker Cache

```javascript
const CACHE_NAME = 'strassenbahn-v1';
const urlsToCache = [
  '/strassenbahnsignale_master.json',
  '/images/Signal_F_0.svg',
  '/images/Signal_F_1.svg',
  // ... alle anderen Bilder
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

---

## 📚 Lernmodus-Ideen

### 1. Kategorie-Training

Trainiere jede Kategorie einzeln:
- Fahrsignale (F 0 - F 5)
- Weichensignale (W 0 - W 14)
- Streckensignale (St 1 - St 8)
- etc.

### 2. Schwierigkeitsstufen

- **Anfänger:** Nur Haupt-Fahrsignale (F 0 - F 5)
- **Fortgeschritten:** + Weichen, Strecken, Sonder
- **Experte:** + Historisch, Regional, H/V-System

### 3. Verwechslungs-Training

Trainiere ähnliche Signale:
- F 1, F 2, F 3 (Richtungsbalken)
- W 1/W 11, W 2/W 12, W 3/W 13 (mit/ohne Verschluss)
- St 1/St 2, St 3/St 4, St 5/St 6 (Gegensätze)

---

## 🌐 Quellen

- **Wikipedia:** [Straßenbahnsignale in Deutschland](https://de.wikipedia.org/wiki/Straßenbahnsignale_in_Deutschland)
- **BOStrab:** Straßenbahn-Bau- und Betriebsordnung
- **H/V-Signalsystem:** Eisenbahn-Signalbuch

---

## 📄 Lizenz

Die Daten stammen von Wikipedia und unterliegen der Creative Commons Lizenz.

---

## 🤝 Beitragen

Fehler gefunden oder Ergänzungen? Erstelle ein Issue oder Pull Request!

**GitHub:** https://github.com/710Deckel/Strassenbahn

---

## 📞 Kontakt

Entwickelt von **710Deckel** für Fahrschul-Training und ÖPNV-Bildung.
