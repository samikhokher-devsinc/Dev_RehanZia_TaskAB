export async function scrapeClient(url: string) {
  const u = (url || '').trim()
  if (!u) throw new Error('Please enter a valid URL')

  try {
    const res = await fetch(`/api/scrape?url=${encodeURIComponent(u)}`)
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      const msg = data?.error || 'Scraping failed'
      throw new Error(msg)
    }
    return data
  } catch (err: any) {
    if (err instanceof Error) throw err
    throw new Error('Network error occurred')
  }
}
