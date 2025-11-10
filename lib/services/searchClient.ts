export async function searchClient(query: string) {
  const q = (query || '').trim()
  if (!q) throw new Error('Please enter a search query to begin analysis')

  try {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q })
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      const msg = data?.error || 'Search analysis failed'
      throw new Error(msg)
    }
    return data
  } catch (err: any) {
    if (err instanceof Error) throw err
    throw new Error('Network connectivity issue detected')
  }
}