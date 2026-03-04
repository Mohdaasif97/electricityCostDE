import Head from 'next/head';
import { useState, useCallback } from 'react';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

const GERAETE_PRESETS = [
  { name: 'Kühlschrank (A++)', watt: 100, stunden: 24, tage: 7 },
  { name: 'Gefrierschrank (A++)', watt: 120, stunden: 24, tage: 7 },
  { name: 'Waschmaschine (60°C)', watt: 1600, stunden: 1.5, tage: 3 },
  { name: 'Wäschetrockner', watt: 2200, stunden: 1.5, tage: 3 },
  { name: 'Spülmaschine', watt: 1800, stunden: 1.5, tage: 5 },
  { name: 'Elektroherd', watt: 2000, stunden: 1, tage: 7 },
  { name: 'Backofen', watt: 2100, stunden: 0.5, tage: 3 },
  { name: 'Mikrowelle', watt: 900, stunden: 0.25, tage: 7 },
  { name: 'Kaffeemaschine', watt: 900, stunden: 0.25, tage: 7 },
  { name: 'Wasserkocher', watt: 2000, stunden: 0.1, tage: 7 },
  { name: 'Fernseher (55 Zoll)', watt: 120, stunden: 4, tage: 7 },
  { name: 'PC Desktop', watt: 300, stunden: 4, tage: 5 },
  { name: 'Laptop', watt: 50, stunden: 6, tage: 5 },
  { name: 'Gaming-PC', watt: 500, stunden: 3, tage: 5 },
  { name: 'Playstation / Xbox', watt: 200, stunden: 2, tage: 5 },
  { name: 'WLAN-Router', watt: 10, stunden: 24, tage: 7 },
  { name: 'Elektroheizung (2kW)', watt: 2000, stunden: 4, tage: 5 },
  { name: 'Wärmepumpe', watt: 3000, stunden: 8, tage: 7 },
  { name: 'E-Auto laden (11kW)', watt: 11000, stunden: 8, tage: 3 },
  { name: 'Eigenes Gerät', watt: '', stunden: '', tage: 7 },
];

const DEFAULT_STROMPREIS = 0.32; // €/kWh Durchschnitt Deutschland 2026

export default function Home() {
  const [watt, setWatt] = useState('');
  const [stunden, setStunden] = useState('');
  const [tage, setTage] = useState(7);
  const [strompreis, setStrompreis] = useState(DEFAULT_STROMPREIS);
  const [preset, setPreset] = useState('');
  const [ergebnis, setErgebnis] = useState(null);

  const handlePreset = useCallback((e) => {
    const idx = e.target.value;
    setPreset(idx);
    if (idx === '') return;
    const g = GERAETE_PRESETS[parseInt(idx)];
    setWatt(g.watt);
    setStunden(g.stunden);
    setTage(g.tage);
    setErgebnis(null);
  }, []);

  const berechnen = useCallback(() => {
    const w = parseFloat(watt);
    const h = parseFloat(stunden);
    const t = parseFloat(tage);
    const p = parseFloat(strompreis);

    if (isNaN(w) || isNaN(h) || isNaN(t) || isNaN(p) || w < 0 || h < 0 || t < 0 || p < 0) {
      alert('Bitte alle Felder korrekt ausfüllen.');
      return;
    }

    // kWh pro Tag
    const kwhProTag = (w * h) / 1000;

    // kWh pro Woche
    const kwhProWoche = kwhProTag * t;

    // kWh pro Jahr (more precise)
    const kwhProJahr = kwhProTag * t * (365 / 7);

    // kWh pro Monat (divide year by 12)
    const kwhProMonat = kwhProJahr / 12;
    

    setErgebnis({
      kwhProTag: kwhProTag.toFixed(4),
      kwhProWoche: kwhProWoche.toFixed(3),
      kwhProMonat: kwhProMonat.toFixed(2),
      kwhProJahr: kwhProJahr.toFixed(2),
      kostenProTag: (kwhProTag * p).toFixed(4),
      kostenProWoche: (kwhProWoche * p).toFixed(2),
      kostenProMonat: (kwhProMonat * p).toFixed(2),
      kostenProJahr: (kwhProJahr * p).toFixed(2),
    });
  }, [watt, stunden, tage, strompreis]);

  const zuruecksetzen = () => {
    setWatt('');
    setStunden('');
    setTage(7);
    setStrompreis(DEFAULT_STROMPREIS);
    setPreset('');
    setErgebnis(null);
  };

  const schemaOrgData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Stromkostenrechner 2026",
    "description": "Kostenloser Stromkostenrechner 2026: Berechnen Sie Ihren Stromverbrauch in kWh und Ihre Stromkosten pro Tag, Monat und Jahr für jedes Gerät.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "featureList": [
      "Stromverbrauch berechnen kWh",
      "Stromkosten pro Tag berechnen",
      "Stromkosten pro Monat berechnen",
      "Stromkosten pro Jahr berechnen",
      "Geräte-Presets für gängige Haushaltsgeräte"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie berechnet man Stromkosten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Stromkosten berechnen: Leistung (Watt) × Betriebsstunden ÷ 1000 = kWh (Kilowattstunden). Dann kWh × Strompreis (€/kWh) = Kosten. Beispiel: 100 Watt × 10 Stunden = 1 kWh × 0,32 €/kWh = 0,32 € pro Tag."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet 1 kWh Strom in Deutschland 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der durchschnittliche Strompreis in Deutschland beträgt 2026 ca. 30–35 Cent pro kWh (Kilowattstunde). Der genaue Preis hängt von Ihrem Anbieter und Tarif ab."
        }
      },
      {
        "@type": "Question",
        "name": "Wie viel Strom verbraucht ein durchschnittlicher Haushalt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ein durchschnittlicher 2-Personen-Haushalt in Deutschland verbraucht ca. 2.500–3.000 kWh Strom pro Jahr. Ein 4-Personen-Haushalt verbraucht ca. 4.000–5.000 kWh jährlich."
        }
      },
      {
        "@type": "Question",
        "name": "Was sind die größten Stromfresser im Haushalt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Die größten Stromverbraucher im Haushalt sind: Heizpumpen (bis 800 kWh/Jahr), Elektroherd (ca. 250 kWh/Jahr), Kühl- und Gefrierschrank (200–300 kWh/Jahr), Waschmaschine und Trockner sowie Warmwasserbereitung."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Ihren Stromverbrauch & Kosten berechnen – Stromkostenrechner</title>
        <meta name="description" content="Stromverbrauch und Kosten berechnen – kostenlos! Berechnen Sie ihren Stromverbrauch in kWh pro Tag, Monat und Jahr für alle Haushaltsgeräte." />
        <meta name="keywords" content="stromkostenrechner, stromverbrauch berechnen, stromkosten berechnen, kWh rechner, stromkosten pro monat, stromkosten pro jahr, strom kosten berechnen, stromrechner, kilowattstunden berechnen, elektrizitätskosten rechner, energiekosten rechner" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Stromkostenrechner.de" />
        <meta name="language" content="de" />
        <link rel="canonical" href="https://www.stromkostenrechner9.de/" />

        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:title" content="Ihren Stromverbrauch & Kosten berechnen – Stromkostenrechner" />
        <meta property="og:description" content="Kostenloser Stromkostenrechner: Berechnen Sie Ihren Stromverbrauch und Ihre Stromkosten pro Tag, Monat und Jahr für jedes Haushaltsgerät." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:url" content="https://www.stromkostenrechner9.de/" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ihren Stromverbrauch & Kosten – Jetzt berechnen!" />
        <meta name="twitter:description" content="Kostenloser Online-Stromkostenrechner für Deutschland 2026. Stromverbrauch in kWh & Kosten sofort berechnen." />

        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
       <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
  onLoad={(e) => { e.currentTarget.rel = 'stylesheet' }}
/>
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</noscript>
  
      </Head>

      <div className={styles.page}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>⚡</span>
              <span className={styles.logoText}>Stromkostenrechner<span>.de</span></span>
            </div>
            <nav className={styles.nav}>
              <a href="#rechner">Rechner</a>
              <a href="#tipps">Spartipps</a>
              <a href="#faq">FAQ</a>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.h1}>
                Stromkostenrechner 2026
              </h1>
              <p className={styles.heroSubtitle}>
                Berechnen Sie Ihren <strong>Stromverbrauch</strong> und Ihre <strong>Stromkosten</strong> pro Tag, Monat und Jahr — kostenlos und sofort.
              </p>
              <div className={styles.heroBadges}>
                <span>✅ Kostenlos</span>
                <span>✅ Alle Haushaltsgeräte</span>
                <span>✅ Aktueller Strompreis 2026</span>
              </div>
            </div>
          </section>

          {/* Calculator */}
          <section id="rechner" className={styles.calcSection}>
            <div className={styles.container}>
              <div className={styles.calcCard}>
                <h2 className={styles.calcTitle}>Stromkosten berechnen</h2>
                <p className={styles.calcSubtitle}>Gerät auswählen oder eigene Werte eingeben</p>

                <div className={styles.form}>
                  {/* Preset */}
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="geraet">
                      Gerät auswählen (optional)
                    </label>
                    <select
                      id="geraet"
                      className={styles.select}
                      value={preset}
                      onChange={handlePreset}
                    >
                      <option value="">— Gerät auswählen —</option>
                      {GERAETE_PRESETS.map((g, i) => (
                        <option key={i} value={i}>{g.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.inputRow}>
                    {/* Watt */}
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="watt">
                        Leistung (Watt)
                        <span className={styles.hint} title="Die Wattzahl finden Sie auf dem Gerät oder im Handbuch">ⓘ</span>
                      </label>
                      <div className={styles.inputWrap}>
                        <input
                          id="watt"
                          type="number"
                          min="0"
                          step="1"
                          placeholder="z.B. 100"
                          className={styles.input}
                          value={watt}
                          onChange={e => { setWatt(e.target.value); setErgebnis(null); }}
                        />
                        <span className={styles.unit}>W</span>
                      </div>
                    </div>

                    {/* Stunden */}
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="stunden">
                        Betrieb pro Tag (Stunden)
                        <span className={styles.hint} title="Wie viele Stunden läuft das Gerät täglich?">ⓘ</span>
                      </label>
                      <div className={styles.inputWrap}>
                        <input
                          id="stunden"
                          type="number"
                          min="0"
                          max="24"
                          step="0.25"
                          placeholder="z.B. 4"
                          className={styles.input}
                          value={stunden}
                          onChange={e => { setStunden(e.target.value); setErgebnis(null); }}
                        />
                        <span className={styles.unit}>h</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.inputRow}>
                    {/* Tage pro Woche */}
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="tage">
                        Betriebstage pro Woche
                        <span className={styles.hint} title="An wie vielen Tagen pro Woche nutzen Sie das Gerät?">ⓘ</span>
                      </label>
                      <div className={styles.inputWrap}>
                        <input
                          id="tage"
                          type="number"
                          min="1"
                          max="7"
                          step="1"
                          className={styles.input}
                          value={tage}
                          onChange={e => { setTage(e.target.value); setErgebnis(null); }}
                        />
                        <span className={styles.unit}>Tage</span>
                      </div>
                    </div>

                    {/* Strompreis */}
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="strompreis">
                        Strompreis (€/kWh)
                        <span className={styles.hint} title="Den aktuellen Strompreis finden Sie auf Ihrer Stromrechnung. Aktuell ca. 0,32 €/kWh in Deutschland.">ⓘ</span>
                      </label>
                      <div className={styles.inputWrap}>
                        <input
                          id="strompreis"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.32"
                          className={styles.input}
                          value={strompreis}
                          onChange={e => { setStrompreis(e.target.value); setErgebnis(null); }}
                        />
                        <span className={styles.unit}>€/kWh</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.btnRow}>
                    <button className={styles.btnCalc} onClick={berechnen}>
                      ⚡ Jetzt berechnen
                    </button>
                    <button className={styles.btnReset} onClick={zuruecksetzen}>
                      ↺ Zurücksetzen
                    </button>
                  </div>
                </div>

                {/* Results */}
                {ergebnis && (
                  <div className={styles.results}>
                    <h3 className={styles.resultTitle}>Ergebnis</h3>
                    <div className={styles.resultGrid}>
                      <div className={styles.resultCard}>
                        <span className={styles.resultPeriod}>Pro Tag</span>
                        <span className={styles.resultKwh}>{ergebnis.kwhProTag} kWh</span>
                        <span className={styles.resultCost}>{ergebnis.kostenProTag} €</span>
                      </div>
                      <div className={styles.resultCard}>
                        <span className={styles.resultPeriod}>Pro Woche</span>
                        <span className={styles.resultKwh}>{ergebnis.kwhProWoche} kWh</span>
                        <span className={styles.resultCost}>{ergebnis.kostenProWoche} €</span>
                      </div>
                      <div className={`${styles.resultCard} ${styles.resultCardHighlight}`}>
                        <span className={styles.resultPeriod}>Pro Monat</span>
                        <span className={styles.resultKwh}>{ergebnis.kwhProMonat} kWh</span>
                        <span className={styles.resultCost}>{ergebnis.kostenProMonat} €</span>
                      </div>
                      <div className={`${styles.resultCard} ${styles.resultCardHighlight}`}>
                        <span className={styles.resultPeriod}>Pro Jahr</span>
                        <span className={styles.resultKwh}>{ergebnis.kwhProJahr} kWh</span>
                        <span className={styles.resultCost}>{ergebnis.kostenProJahr} €</span>
                      </div>
                    </div>
                    <p className={styles.resultNote}>
                      Berechnung: {watt} W × {stunden} h × {tage} Tage/Woche bei {strompreis} €/kWh
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SEO Richtext Content */}
          <section className={styles.contentSection}>
            <div className={styles.container}>
              <article className={styles.article}>

                <h2>Stromkostenrechner 2026 – So berechnen Sie Ihren Stromverbrauch</h2>
                <p>
                  Mit unserem kostenlosen <strong>Stromkostenrechner</strong> können Sie in wenigen Sekunden berechnen, wie viel Strom ein einzelnes Haushaltsgerät verbraucht und welche <strong>Stromkosten</strong> dabei entstehen — aufgeschlüsselt nach Tag, Woche, Monat und Jahr. Der Rechner berücksichtigt dabei die <strong>Leistung in Watt</strong>, die tägliche <strong>Betriebsdauer in Stunden</strong> sowie die <strong>Betriebstage pro Woche</strong>. Als Ergebnis erhalten Sie den Energieverbrauch in <strong>Kilowattstunden (kWh)</strong> sowie die exakten Kosten in Euro auf Basis Ihres aktuellen Strompreises.
                </p>
                <p>
                  Der <strong>aktuelle Strompreis</strong> in Deutschland liegt im Jahr 2026 bei durchschnittlich rund <strong>30 bis 35 Cent pro Kilowattstunde (kWh)</strong>. Im Rechner ist ein Standardwert von 0,32 €/kWh voreingestellt, den Sie jederzeit durch Ihren persönlichen Tarif ersetzen können. Den genauen Preis Ihres Stromvertrags finden Sie auf Ihrer letzten Jahresabrechnung oder im Online-Portal Ihres Anbieters.
                </p>

                <h2>Wie funktioniert die Berechnung der Stromkosten?</h2>
                <p>
                  Die <strong>Berechnung der Stromkosten</strong> folgt einer einfachen Formel: Zunächst wird der <strong>Stromverbrauch in kWh</strong> berechnet, indem die Wattzahl des Gerätes mit der täglichen Betriebsdauer in Stunden multipliziert und durch 1.000 geteilt wird. Dies ergibt den <strong>Verbrauch pro Tag in Kilowattstunden</strong>. Anschließend wird dieser Tageswert mit der Anzahl der Betriebstage pro Woche multipliziert, um den <strong>Wochenverbrauch</strong> zu ermitteln. Für den <strong>Monatsverbrauch</strong> wird der Wochenwert mit dem Faktor 4,345 (entspricht 365/12/7) multipliziert — dieser Wert berücksichtigt, dass ein Monat im Durchschnitt mehr als vier Wochen hat. Den <strong>Jahresverbrauch in kWh</strong> erhalten Sie durch Multiplikation des Wochenwertes mit 52.
                </p>
                <p>
                  Die Formel im Überblick:<br />
                  <strong>kWh/Tag = (Watt × Stunden/Tag) ÷ 1.000</strong><br />
                  <strong>kWh/Woche = kWh/Tag × Tage/Woche</strong><br />
                  <strong>kWh/Monat = kWh/Woche × 4,345</strong><br />
                  <strong>kWh/Jahr = kWh/Woche × 52</strong><br />
                  <strong>Kosten = kWh × Strompreis (€/kWh)</strong>
                </p>

                <h3>Beispiel: Stromkosten Kühlschrank berechnen</h3>
                <p>
                  Ein moderner Kühlschrank mit einer Leistungsaufnahme von 100 Watt (Energieeffizienzklasse A++) läuft 24 Stunden am Tag, 7 Tage die Woche. Bei einem Strompreis von 0,32 €/kWh ergibt sich:<br />
                  100 W × 24 h ÷ 1.000 = <strong>2,4 kWh pro Tag</strong><br />
                  2,4 kWh × 0,32 €/kWh = <strong>0,77 € pro Tag</strong><br />
                  Das entspricht ca. <strong>23 € pro Monat</strong> und rund <strong>280 € pro Jahr</strong>.
                </p>

                <h3>Beispiel: Stromkosten Waschmaschine berechnen</h3>
                <p>
                  Eine Waschmaschine mit 1.600 Watt Leistung läuft durchschnittlich 1,5 Stunden pro Waschgang, 3 Tage pro Woche:<br />
                  1.600 W × 1,5 h ÷ 1.000 = <strong>2,4 kWh pro Waschtag</strong><br />
                  2,4 kWh × 0,32 € = <strong>0,77 € pro Waschgang</strong><br />
                  Das ergibt ca. <strong>10 € pro Monat</strong> bzw. rund <strong>120 € pro Jahr</strong>.
                </p>
              </article>
            </div>
          </section>

          {/* Tipps Section */}
          <section id="tipps" className={styles.tippsSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Die größten Stromfresser im Haushalt – und wie Sie effektiv Strom sparen</h2>
              <p className={styles.sectionIntro}>
                Wer seinen <strong>Stromverbrauch senken</strong> und dauerhaft <strong>Stromkosten sparen</strong> möchte, sollte zunächst wissen, welche Geräte am meisten Energie verbrauchen. Nutzen Sie unseren <strong>Stromkostenrechner</strong>, um die Kosten Ihrer eigenen Geräte zu ermitteln und Einsparpotenziale zu identifizieren.
              </p>
              <div className={styles.tippsGrid}>
                {[
                  {
                    icon: '🔥',
                    title: '1. Heizpumpen & Heizung',
                    text: 'Veraltete Heizpumpen zählen zu den größten Stromfressern überhaupt. Eine alte Umwälzpumpe kann bis zu 800 kWh pro Jahr verbrauchen – das entspricht Kosten von rund 256 Euro jährlich. Moderne Hocheffizienzpumpen verbrauchen bis zu 80 % weniger Strom. Eine Erneuerung nach spätestens 10–15 Jahren Betrieb ist daher wirtschaftlich sinnvoll.'
                  },
                  {
                    icon: '🍳',
                    title: '2. Elektroherd & Backofen',
                    text: 'Der Elektroherd ist einer der energieintensivsten Verbraucher in der Küche. Allein durch das Kochen entstehen jährlich Stromkosten von bis zu 100 Euro. Tipps zum Sparen: Töpfe mit passendem Durchmesser verwenden, Restwärme der Herdplatte nutzen, Deckel beim Kochen auflegen und beim Backofen auf Umluft statt Ober-/Unterhitze setzen.'
                  },
                  {
                    icon: '❄️',
                    title: '3. Kühlschrank & Gefrierschrank',
                    text: 'Kühl- und Gefriergeräte laufen 365 Tage im Jahr rund um die Uhr. Bereits ein Gerät der Effizienzklasse A++ verbraucht 200–300 kWh jährlich. Ältere Modelle (Klasse A oder schlechter) können das Doppelte verbrauchen. Stellen Sie den Kühlschrank nicht neben den Herd oder in die Sonne, und halten Sie die Türdichtungen sauber und intakt.'
                  },
                  {
                    icon: '👕',
                    title: '4. Waschmaschine & Wäschetrockner',
                    text: 'Der Wäschetrockner ist besonders energiehungrig: Er verbraucht pro Trockenzyklus 3–5 kWh. Wer auf Wäscheleine oder Ständer verzichtet, zahlt bei 4 Trockengängen pro Woche schnell 200 Euro mehr pro Jahr. Waschen bei 30 oder 40 Grad statt 60 Grad kann den Stromverbrauch um bis zu 40 % reduzieren.'
                  },
                  {
                    icon: '💻',
                    title: '5. Computer, TV & Unterhaltungselektronik',
                    text: 'Ein Desktop-PC mit Bildschirm verbraucht 200–400 Watt im Betrieb. Über 8 Stunden tägliche Nutzung summiert sich das auf 400–1.000 kWh pro Jahr – Kosten von 130 bis 320 Euro. Wichtig: Standby-Modus abschalten! Viele Geräte verbrauchen im Standby noch 5–20 Watt kontinuierlich, was sich über das Jahr zu erheblichen Kosten summiert.'
                  },
                  {
                    icon: '🌡️',
                    title: '6. Elektroheizungen & Klimaanlagen',
                    text: 'Elektrische Heizlüfter und Raumheizungen sind wahre Stromfresser: Ein 2-kW-Heizlüfter, der täglich 4 Stunden läuft, verursacht monatliche Kosten von 88 Euro. Klimaanlagen können bei intensiver Nutzung im Sommer schnell 300–500 kWh pro Monat verbrauchen. Wärmepumpen sind deutlich effizienter, da sie pro kWh Strom bis zu 4 kWh Wärme liefern (COP 4).'
                  },
                ].map((t, i) => (
                  <div key={i} className={styles.tippCard}>
                    <span className={styles.tippIcon}>{t.icon}</span>
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Durchschnittswerte Tabelle */}
          <section className={styles.tableSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Durchschnittlicher Stromverbrauch & Stromkosten gängiger Haushaltsgeräte 2026</h2>
              <p>
                Die folgende Tabelle zeigt den <strong>durchschnittlichen Stromverbrauch</strong> und die geschätzten jährlichen <strong>Stromkosten</strong> häufiger Haushaltsgeräte. Die Kosten basieren auf einem angenommenen Strompreis von 0,32 €/kWh.
              </p>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Gerät</th>
                      <th>Leistung (Watt)</th>
                      <th>Ø Betrieb/Tag</th>
                      <th>kWh/Jahr</th>
                      <th>Kosten/Jahr (0,32 €)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Kühlschrank (A++)', '80–120 W', '24 Std.', '250–350 kWh', '80–112 €'],
                      ['Gefrierschrank (A++)', '100–150 W', '24 Std.', '300–450 kWh', '96–144 €'],
                      ['Waschmaschine', '1.400–2.000 W', '1,5 Std. (4×/Wo)', '300–500 kWh', '96–160 €'],
                      ['Wäschetrockner', '2.000–3.000 W', '1,5 Std. (3×/Wo)', '280–560 kWh', '90–180 €'],
                      ['Spülmaschine', '1.200–2.000 W', '1,5 Std. (5×/Wo)', '230–400 kWh', '74–128 €'],
                      ['Elektroherd', '1.000–2.500 W', '1 Std.', '200–400 kWh', '64–128 €'],
                      ['Backofen', '1.500–3.000 W', '0,5 Std.', '100–250 kWh', '32–80 €'],
                      ['Fernseher (55")', '80–150 W', '4 Std.', '110–220 kWh', '35–70 €'],
                      ['Desktop-PC', '200–400 W', '4 Std.', '290–580 kWh', '93–186 €'],
                      ['Laptop', '30–80 W', '6 Std.', '66–175 kWh', '21–56 €'],
                      ['WLAN-Router', '8–15 W', '24 Std.', '70–130 kWh', '22–42 €'],
                      ['E-Auto (11 kW Wallbox)', '11.000 W', '6–8 Std. (2×/Wo)', '700–1.300 kWh', '224–416 €'],
                    ].map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => <td key={j}>{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.tableNote}>
                * Alle Angaben sind Durchschnittswerte. Die tatsächlichen Kosten hängen von Gerät, Nutzungsverhalten und Ihrem individuellen <strong>Stromtarif</strong> ab. Nutzen Sie den <strong>Stromkostenrechner</strong> oben für eine genaue Berechnung.
              </p>
            </div>
          </section>

          {/* Strompreis Info */}
          <section className={styles.infoSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Aktueller Strompreis Deutschland 2026</h2>
              <p>
                Der durchschnittliche <strong>Haushaltsstrompreis in Deutschland</strong> beträgt im Jahr 2026 zwischen <strong>30 und 35 Cent pro Kilowattstunde (kWh)</strong>, inklusive aller Abgaben, Steuern und Netzentgelte. Der Preis setzt sich aus mehreren Komponenten zusammen: dem eigentlichen Energiepreis, den Netzentgelten, Steuern (Umsatzsteuer, Stromsteuer) sowie verschiedenen Umlagen.
              </p>
              <p>
                Im Vergleich zu anderen europäischen Ländern gehört Deutschland damit zu den Ländern mit den höchsten <strong>Strompreisen</strong>. Dänemark und Irland liegen ähnlich hoch, während Länder wie Frankreich (Kernenergie) oder Norwegen (Wasserkraft) deutlich günstigere Tarife anbieten.
              </p>
              <p>
                <strong>Tipp:</strong> Den günstigsten Stromtarif für Ihren Haushalt finden Sie über einen <strong>Stromanbieter-Vergleich</strong>. Bei einem jährlichen Verbrauch von 3.500 kWh können Sie durch einen Anbieterwechsel oft 100–200 Euro pro Jahr einsparen.
              </p>

              <div className={styles.infoBoxGrid}>
                <div className={styles.infoBox}>
                  <h3>Ø Verbrauch 1-Personen-Haushalt</h3>
                  <p className={styles.infoBoxValue}>~1.500 kWh/Jahr</p>
                  <p>entspricht ca. <strong>480 € pro Jahr</strong> bei 0,32 €/kWh</p>
                </div>
                <div className={styles.infoBox}>
                  <h3>Ø Verbrauch 2-Personen-Haushalt</h3>
                  <p className={styles.infoBoxValue}>~2.500 kWh/Jahr</p>
                  <p>entspricht ca. <strong>800 € pro Jahr</strong> bei 0,32 €/kWh</p>
                </div>
                <div className={styles.infoBox}>
                  <h3>Ø Verbrauch 4-Personen-Haushalt</h3>
                  <p className={styles.infoBoxValue}>~4.500 kWh/Jahr</p>
                  <p>entspricht ca. <strong>1.440 € pro Jahr</strong> bei 0,32 €/kWh</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className={styles.faqSection}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Häufige Fragen zum Stromkostenrechner</h2>
              <div className={styles.faqList}>
                {[
                  {
                    q: 'Wie berechnet man Stromkosten richtig?',
                    a: 'Die Formel lautet: Leistung (Watt) × Betriebsstunden pro Tag ÷ 1.000 = kWh pro Tag. Die kWh multiplizieren Sie mit dem Strompreis in €/kWh, um die Tageskosten zu erhalten. Unser Stromkostenrechner erledigt diese Berechnung automatisch und liefert Ihnen die Kosten für Tag, Woche, Monat und Jahr.'
                  },
                  {
                    q: 'Was kostet 1 kWh Strom in Deutschland 2026?',
                    a: 'Der durchschnittliche Strompreis in Deutschland beträgt 2026 ca. 30–35 Cent pro kWh (Kilowattstunde). Der genaue Preis hängt von Ihrem Anbieter, Tarif und Region ab. Sie finden Ihren persönlichen Preis auf Ihrer Stromrechnung oder im Online-Kundenportal.'
                  },
                  {
                    q: 'Wie viel kWh verbraucht ein normaler Haushalt pro Monat?',
                    a: 'Ein durchschnittlicher 2-Personen-Haushalt verbraucht ca. 200 kWh pro Monat (2.500 kWh/Jahr). Ein 4-Personen-Haushalt liegt bei etwa 375 kWh/Monat (4.500 kWh/Jahr). Haushalte mit Elektroauto oder Wärmepumpe können deutlich mehr verbrauchen.'
                  },
                  {
                    q: 'Wo finde ich die Wattzahl meines Gerätes?',
                    a: 'Die Leistungsaufnahme in Watt finden Sie auf dem Typenschild des Gerätes (meist auf der Rückseite oder Unterseite), im Handbuch oder auf der Verpackung. Bei älteren Geräten ohne Angabe können Sie auch ein Energiemessgerät (Strommessgerät) verwenden, das Sie für ca. 15–30 Euro kaufen können.'
                  },
                  {
                    q: 'Wie kann ich meine Stromkosten senken?',
                    a: 'Die effektivsten Maßnahmen: (1) Alte Geräte durch energieeffiziente Modelle ersetzen (Effizienzklasse A oder höher), (2) Standby-Betrieb vermeiden und Geräte komplett ausschalten, (3) Waschmaschine bei 30–40°C statt 60°C betreiben, (4) LED-Leuchtmittel verwenden, (5) Kühlschrank und Gefrierer richtig positionieren und regelmäßig abtauen, (6) Günstigen Stromtarif per Vergleichsrechner finden.'
                  },
                  {
                    q: 'Welcher Haushalt verbraucht den meisten Strom?',
                    a: 'Haushalte mit Elektroauto, elektrischer Wärmepumpenheizung oder einem Heimkino-Setup verbrauchen am meisten Strom. Ein E-Auto-Haushalt kann 5.000–8.000 kWh extra pro Jahr verbrauchen. Wärmepumpen benötigen 3.000–8.000 kWh/Jahr, sind aber trotzdem effizienter als klassische Elektroheizungen.'
                  },
                ].map((item, i) => (
                  <details key={i} className={styles.faqItem}>
                    <summary className={styles.faqQ}>{item.q}</summary>
                    <p className={styles.faqA}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom SEO Content */}
          <section className={styles.contentSection}>
            <div className={styles.container}>
              <article className={styles.article}>
                <h2>Stromverbrauch optimieren – Schritt für Schritt</h2>
                <p>
                  Um Ihren <strong>Stromverbrauch dauerhaft zu senken</strong> und <strong>Stromkosten zu reduzieren</strong>, empfiehlt sich ein strukturiertes Vorgehen. Beginnen Sie damit, alle Geräte im Haushalt mit unserem <strong>Stromkostenrechner</strong> zu analysieren. Notieren Sie den jährlichen Verbrauch jedes Gerätes und identifizieren Sie die größten Stromverbraucher. Gerade bei sehr alten Geräten lohnt sich oft ein schneller Vergleich mit neueren, energieeffizienten Modellen.
                </p>
                <p>
                  Besonders wirksam ist auch die Überprüfung des <strong>Standby-Verbrauchs</strong>. Viele moderne Geräte wie Fernseher, Sat-Receiver, Spielekonsolen und Ladegeräte verbrauchen im Bereitschaftsmodus zwischen 2 und 20 Watt. Das klingt wenig, summiert sich bei mehreren Geräten aber schnell auf 50–100 kWh jährlich – das entspricht 16–32 Euro pro Jahr. Abschaltbare Steckerleisten helfen, den Standby-Strom komplett zu eliminieren.
                </p>
                <p>
                  Eine weitere wichtige Maßnahme ist die <strong>Optimierung der Beleuchtung</strong>. Wer noch alte Glühlampen oder Halogenbirnen nutzt, sollte auf <strong>LED-Leuchtmittel</strong> umstellen. Eine LED-Lampe verbraucht bei gleicher Helligkeit 80–90 % weniger Strom als eine klassische Glühbirne und hält zudem 10–15 Mal länger. Bei einem Haushalt mit 20 Lampen können Sie durch die Umstellung auf LED jährlich bis zu 200 kWh einsparen.
                </p>

                <h2>Stromkostenrechner für Unternehmen und Gewerbe</h2>
                <p>
                  Unser <strong>Stromkostenrechner</strong> eignet sich auch für Kleinunternehmen und Gewerbetreibende, die die <strong>Energiekosten einzelner Maschinen oder Anlagen</strong> berechnen möchten. Geben Sie einfach die Wattzahl der Maschine, die tägliche Betriebsdauer und Ihren <strong>Gewerbestrompreis</strong> ein, um die genauen Kosten zu ermitteln. Gewerbestrompreise liegen in Deutschland 2026 typischerweise zwischen 18 und 28 Cent/kWh — deutlich unter den Haushaltsstrompreisen, da Unternehmen von einer günstigeren Netzentgeltstruktur profitieren können.
                </p>

                <h2>Photovoltaik und Eigenverbrauch – Stromkosten auf Null?</h2>
                <p>
                  Mit einer <strong>Photovoltaikanlage</strong> können Haushalte ihren eigenen Strom erzeugen und die <strong>Stromkosten drastisch senken</strong>. Eine typische 10-kWp-Anlage erzeugt in Deutschland 8.000–10.000 kWh Strom pro Jahr. Bei einem Eigenstromanteil von 30–50 % können Sie Ihre jährlichen Stromkosten um 800–1.600 Euro senken. Durch einen <strong>Heimspeicher</strong> lässt sich der Eigenverbrauchsanteil auf 60–80 % erhöhen, was die Einsparungen weiter steigert. Nutzen Sie unseren Rechner, um zu berechnen, welche Ihrer Geräte am meisten von eigenem Sonnenstrom profitieren würden.
                </p>
              </article>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.container}>
            <div className={styles.footerInner}>
              <div className={styles.footerBrand}>
                <span className={styles.logoIcon}>⚡</span>
                <span className={styles.logoText}>Stromkostenrechner<span>.de</span></span>
                <p>Ihr kostenloser Online-Rechner für Stromverbrauch und Stromkosten in Deutschland.</p>
              </div>
              <div className={styles.footerLinks}>
                <a href="#rechner">Stromkostenrechner</a>
                <a href="#tipps">Spartipps</a>
                <a href="#faq">FAQ</a>
              </div>
            </div>
            <p className={styles.footerDisclaimer}>
              © 2026 Stromkostenrechner.de — Alle Angaben ohne Gewähr. Die Berechnungen dienen der Orientierung. Tatsächliche Stromkosten können je nach Gerät, Nutzungsverhalten und Tarif abweichen.
            </p>
          </div>
        </footer>
      </div>
      <Footer />
    </>
  );
}