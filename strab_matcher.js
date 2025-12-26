/**
 * 🚊 STRASSENBAHN SIGNAL SVG MATCHER
 * 
 * Automatisches Zuordnen von SVG-Dateien zu Signal-Kurzzeichen
 * Unterstützt verschiedene Dateinamen-Formate
 * 
 * @version 1.0
 * @author 710Deckel
 * @date 2025-12-26
 */

class StrabSignalMatcher {
  constructor(svgFilenames = []) {
    this.svgFiles = svgFilenames;
    this.cache = new Map();
    this.stats = {
      totalQueries: 0,
      cacheHits: 0,
      notFound: 0
    };
  }

  /**
   * Finde die SVG-Datei für ein Signal-Kurzzeichen
   * 
   * @param {string} kurzzeichen - z.B. "F 0", "W 12", "St 7", "H 2"
   * @returns {string|null} - Dateiname oder null wenn nicht gefunden
   */
  findSVG(kurzzeichen) {
    this.stats.totalQueries++;

    // Cache prüfen
    if (this.cache.has(kurzzeichen)) {
      this.stats.cacheHits++;
      return this.cache.get(kurzzeichen);
    }

    // Normalisiere Kurzzeichen
    const normalized = this.normalizeKurzzeichen(kurzzeichen);
    
    // Versuche verschiedene Muster
    const patterns = this.generatePatterns(normalized);
    
    for (const pattern of patterns) {
      const found = this.svgFiles.find(filename => 
        this.matchesPattern(filename, pattern)
      );
      
      if (found) {
        this.cache.set(kurzzeichen, found);
        return found;
      }
    }

    // Nicht gefunden
    this.stats.notFound++;
    this.cache.set(kurzzeichen, null);
    return null;
  }

  /**
   * Normalisiere Kurzzeichen für Suche
   */
  normalizeKurzzeichen(kz) {
    kz = kz.trim();
    
    // Trenne Buchstaben und Zahlen
    const match = kz.match(/^([A-Za-z]+)\s*(\d+[a-z]?)\s*(\([^)]+\))?$/);
    
    if (match) {
      const [, letters, numbers, suffix] = match;
      return {
        letters: letters.toUpperCase(),
        numbers: numbers,
        suffix: suffix || '',
        original: kz
      };
    }
    
    return {
      letters: '',
      numbers: '',
      suffix: '',
      original: kz
    };
  }

  /**
   * Generiere verschiedene Suchmuster
   */
  generatePatterns(norm) {
    const { letters, numbers, suffix } = norm;
    
    if (!letters || !numbers) {
      return [norm.original];
    }

    const cleanSuffix = suffix.replace(/[()]/g, '').trim();
    
    return [
      `Signal_${letters}_${numbers}`,
      cleanSuffix ? `Signal_${letters}_${numbers}_${cleanSuffix}` : null,
      `Signal${letters}${numbers}`,
      `Signal ${letters} ${numbers}`,
      `${letters}_${numbers}`,
      `Signal-${letters}-${numbers}`,
      this.getGermanName(letters, numbers),
      `${letters}${numbers}`,
      `BOStrab_Signal_${letters}_${numbers}`,
      `BOStrab_${letters}_${numbers}`,
      norm.original
    ].filter(p => p !== null);
  }

  /**
   * Deutsche Bezeichnung für Signal-Typ
   */
  getGermanName(letters, numbers) {
    const names = {
      'F': 'Fahrsignal',
      'W': 'Weichensignal',
      'ST': 'Streckensignal',
      'SO': 'Sondersignal',
      'H': 'Hauptsignal',
      'V': 'Vorsignal',
      'G': 'Geschwindigkeitssignal',
      'A': 'Abfahrsignal',
      'BÜ': 'Bahnübergang'
    };
    
    const name = names[letters.toUpperCase()];
    return name ? `${name}_${letters}_${numbers}` : null;
  }

  /**
   * Prüfe ob Dateiname zum Muster passt
   */
  matchesPattern(filename, pattern) {
    const file = filename.toLowerCase();
    const pat = pattern.toLowerCase();
    
    const fileBase = file.replace(/\.(svg|png|jpg|jpeg)$/i, '');
    const patBase = pat.replace(/\.(svg|png|jpg|jpeg)$/i, '');
    
    if (fileBase === patBase) return true;
    if (file.includes(pat)) return true;
    
    const normalizedFile = fileBase.replace(/[-_\s]+/g, '');
    const normalizedPat = patBase.replace(/[-_\s]+/g, '');
    
    return normalizedFile.includes(normalizedPat) || 
           normalizedPat.includes(normalizedFile);
  }

  /**
   * Batch-Verarbeitung: Finde alle SVGs
   */
  findAll(signale) {
    const result = {};
    for (const signal of signale) {
      result[signal.kurzzeichen] = this.findSVG(signal.kurzzeichen);
    }
    return result;
  }

  /**
   * Statistiken abrufen
   */
  getStats(signale = null) {
    const stats = {
      totalQueries: this.stats.totalQueries,
      cacheHits: this.stats.cacheHits,
      notFound: this.stats.notFound,
      cacheHitRate: this.stats.totalQueries > 0 
        ? `${(this.stats.cacheHits / this.stats.totalQueries * 100).toFixed(1)}%`
        : '0%'
    };

    if (signale) {
      const results = this.findAll(signale);
      const matched = Object.values(results).filter(v => v !== null).length;
      stats.total = signale.length;
      stats.matched = matched;
      stats.matchRate = `${(matched / signale.length * 100).toFixed(1)}%`;
    }

    return stats;
  }

  /**
   * Finde fehlende SVGs
   */
  findMissing(signale) {
    const missing = [];
    for (const signal of signale) {
      const svg = this.findSVG(signal.kurzzeichen);
      if (!svg) {
        missing.push({
          kurzzeichen: signal.kurzzeichen,
          bezeichnung: signal.bezeichnung,
          kategorie: signal.kategorie
        });
      }
    }
    return missing;
  }

  clearCache() {
    this.cache.clear();
    this.stats = { totalQueries: 0, cacheHits: 0, notFound: 0 };
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StrabSignalMatcher;
}
