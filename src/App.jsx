import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await fetch(
          'https://api.thecatapi.com/v1/images/search?limit=10'
        )
        if (!response.ok) {
          throw new Error('Error al cargar las imágenes')
        }
        const data = await response.json()
        setCats(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCats()
  }, [])

  return (
    <main className="app-container">
      <header>
        <h1>GaToS pR4</h1>
        <p>Hermosos y tiernos gatitos random para disfrutar</p>
      </header>

      {loading && <p>Cargando imágenes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ul className="cat-grid">
          {cats.map((cat) => (
            <li key={cat.id} className="cat-card">
              <img src={cat.url} alt="Gato" loading="lazy" />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App
