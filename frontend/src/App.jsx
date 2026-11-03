import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:8080/api/stroski'

function App() {
  const [stroski, setStroski] = useState([])
  const [opis, setOpis] = useState('')
  const [znesek, setZnesek] = useState('')
  const [kategorija, setKategorija] = useState('Hrana')
  const [datum, setDatum] = useState(new Date().toISOString().slice(0, 10))
  const [sporocilo, setSporocilo] = useState('')
  const [urejanjeId, setUrejanjeId] = useState(null)
  const [izbranStrosek, setIzbranStrosek] = useState(null)
  const [filterKategorija, setFilterKategorija] = useState('Vse')
  const [razvrstiPo , setRazvrstiPo] = useState('datum-najnovejse')

  async function naloziStroske() {
    try {
      const odgovor = await fetch(API_URL)
      if (!odgovor.ok) throw new Error()
      setStroski(await odgovor.json())
      setSporocilo('')
    } catch {
      setSporocilo('Povezava z backendom ni uspela. Preveri, ali deluje.')
    }
  }

  useEffect(() => {
    naloziStroske()
  }, [])

  async function dodajStrosek(e) {
    e.preventDefault()

    try {
      const odgovor = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opis,
          znesek: Number(znesek),
          kategorija,
          datum,
        }),
      })

      if (!odgovor.ok) throw new Error()

      setOpis('')
      setZnesek('')
      setSporocilo('Strošek je uspešno dodan.')
      await naloziStroske()
    } catch {
      setSporocilo('Stroška ni bilo mogoče dodati.')
    }
  }

  async function izbrisiStrosek(id) {
    if (!window.confirm('Ali res želiš izbrisati ta strošek?')) return

    try {
      const odgovor = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      if (!odgovor.ok) throw new Error()
      setSporocilo('Strošek je izbrisan.')
      await naloziStroske()
    } catch {
      setSporocilo('Stroška ni bilo mogoče izbrisati.')
    }
  }

  async function prikaziPodrobnosti(id) {
    try {
      const odgovor = await fetch(`${API_URL}/${id}`)

      if (!odgovor.ok) {
        throw new Error('Strošek ni bil najden.')
      }

      const podatki = await odgovor.json()
      setIzbranStrosek(podatki)
      setSporocilo('')
    } catch {
      setSporocilo('Podrobnosti stroška ni bilo mogoče naložiti.')
    }
  }

  function zacniUrejanje(strosek) {
    setUrejanjeId(strosek.id)
    setOpis(strosek.opis)
    setZnesek(String(strosek.znesek))
    setKategorija(strosek.kategorija)
    setDatum(strosek.datum)
    setSporocilo('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function shraniSpremembe(e) {
    e.preventDefault()

    try {
      const odgovor = await fetch(`${API_URL}/${urejanjeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opis,
          znesek: Number(znesek),
          kategorija,
          datum,
        }),
      })

      if (!odgovor.ok) throw new Error()

      setUrejanjeId(null)
      setOpis('')
      setZnesek('')
      setKategorija('Hrana')
      setDatum(new Date().toISOString().slice(0, 10))
      setSporocilo('Spremembe so bile uspešno shranjene.')
      await naloziStroske()
    } catch {
      setSporocilo('Sprememb ni bilo mogoče shraniti.')
    }
  }

  const skupaj = stroski.reduce(
      (vsota, strosek) => vsota + Number(strosek.znesek || 0),
      0
  )


  const prikazaniStroski = stroski
      .filter((strosek) =>
          filterKategorija === 'Vse' ||
          strosek.kategorija === filterKategorija
      )
      .sort((a, b) => {
        switch (razvrstiPo) {
          case 'znesek-najmanjsi':
            return Number(a.znesek) - Number(b.znesek)

          case 'znesek-najvecji':
            return Number(b.znesek) - Number(a.znesek)

          case 'datum-najnovejse':
            return b.datum.localeCompare(a.datum)

          case 'datum-najstarejse':
            return a.datum.localeCompare(b.datum)

          default:
            return 0
        }
      })


  return (
      <main className="aplikacija">
        <header className="glava">
          <div>
            <p className="nadnaslov">OSEBNI PRORAČUN</p>
            <h1>Spremljanje stroškov</h1>
            <p className="podnaslov">Preprost pregled nad vsakodnevno porabo.</p>
          </div>
          <div className="skupaj">
            <span>Skupni stroški</span>
            <strong>{skupaj.toFixed(2)} €</strong>
          </div>
        </header>

        <section className="kartica">
          <h2>Dodaj nov strošek</h2>
          <form
              onSubmit={urejanjeId === null ? dodajStrosek : shraniSpremembe}
              className="obrazec"
          >
            <label>
              Opis
              <input
                  value={opis}
                  onChange={(e) => setOpis(e.target.value)}
                  placeholder="Npr. Nakup živil"
                  required
              />
            </label>

            <label>
              Znesek (€)
              <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={znesek}
                  onChange={(e) => setZnesek(e.target.value)}
                  placeholder="0.00"
                  required
              />
            </label>

            <label>
              Kategorija
              <select
                  value={kategorija}
                  onChange={(e) => setKategorija(e.target.value)}
              >
                <option>Hrana</option>
                <option>Prevoz</option>
                <option>Stanovanje</option>
                <option>Zabava</option>
                <option>Zdravje</option>
                <option>Ostalo</option>
              </select>
            </label>

            <label>
              Datum
              <input
                  type="date"
                  value={datum}
                  onChange={(e) => setDatum(e.target.value)}
                  required
              />
            </label>

            <button type="submit">
              {urejanjeId === null ? '+ Dodaj strošek' : 'Shrani spremembe'}
            </button>

            {urejanjeId !== null && (
                <button
                    type="button"
                    className="osvezi"
                    onClick={() => {
                      setUrejanjeId(null)
                      setOpis('')
                      setZnesek('')
                      setKategorija('Hrana')
                      setDatum(new Date().toISOString().slice(0, 10))
                      setSporocilo('')
                    }}
                >
                  Prekliči
                </button>
            )}
          </form>

          {sporocilo && <p className="sporocilo">{sporocilo}</p>}
        </section>

        {izbranStrosek && (
            <section className="kartica">
              <h2>Podrobnosti stroška</h2>

              <p><strong>ID:</strong> {izbranStrosek.id}</p>
              <p><strong>Opis:</strong> {izbranStrosek.opis}</p>
              <p><strong>Znesek:</strong> {Number(izbranStrosek.znesek).toFixed(2)} €</p>
              <p><strong>Kategorija:</strong> {izbranStrosek.kategorija}</p>
              <p><strong>Datum:</strong> {izbranStrosek.datum}</p>

              <button
                  className="osvezi"
                  onClick={() => setIzbranStrosek(null)}
              >
                Zapri podrobnosti
              </button>
            </section>
        )}

        <section className="kartica">
          <div className="naslov-seznama">
            <h2>Tvoji stroški</h2>
            <button className="osvezi" onClick={naloziStroske}>Osveži</button>
          </div>


          <div className="obrazec">
            <label>
              Filtriraj po kategoriji
              <select
                  value={filterKategorija}
                  onChange={(e) => setFilterKategorija(e.target.value)}
              >
                <option value="Vse">Vse kategorije</option>
                <option value="Hrana">Hrana</option>
                <option value="Prevoz">Prevoz</option>
                <option value="Stanovanje">Stanovanje</option>
                <option value="Zabava">Zabava</option>
                <option value="Zdravje">Zdravje</option>
                <option value="Ostalo">Ostalo</option>
              </select>
            </label>

            <label>
              Razvrsti stroške
              <select
                  value={razvrstiPo}
                  onChange={(e) => setRazvrstiPo(e.target.value)}
              >
                <option value="datum-najnovejse">Najnovejši datum</option>
                <option value="datum-najstarejse">Najstarejši datum</option>
                <option value="znesek-najmanjsi">Najmanjši znesek</option>
                <option value="znesek-najvecji">Največji znesek</option>
              </select>
            </label>
          </div>

          {prikazaniStroski.length === 0 ? (
              <p className="prazno">
                {stroski.length === 0
                    ? 'Še nimaš stroškov. Dodaj prvega zgoraj.'
                    : 'V izbrani kategoriji ni stroškov.'}
              </p>
          ) : (
              <div className="tabela-ovoj">
                <table>
                  <thead>
                  <tr>
                    <th>Opis</th>
                    <th>Kategorija</th>
                    <th>Datum</th>
                    <th>Znesek</th>
                    <th>Dejanje</th>
                  </tr>
                  </thead>
                  <tbody>
                  {prikazaniStroski.map((strosek) => (
                      <tr key={strosek.id}>
                        <td>{strosek.opis}</td>
                        <td>{strosek.kategorija}</td>
                        <td>{strosek.datum}</td>
                        <td>{Number(strosek.znesek).toFixed(2)} €</td>
                        <td>
                          <button
                              className="osvezi"
                              onClick={() => zacniUrejanje(strosek)}
                          >
                            Uredi
                          </button>{' '}
                          <button
                              className="osvezi"
                              onClick={() => prikaziPodrobnosti(strosek.id)}
                          >
                            Podrobnosti
                          </button>{' '}
                          <button
                              className="izbrisi"
                              onClick={() => izbrisiStrosek(strosek.id)}
                          >
                            Izbriši
                          </button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}
        </section>
      </main>
  )
}

export default App