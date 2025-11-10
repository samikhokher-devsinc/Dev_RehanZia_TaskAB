'use client'
import { useState } from 'react'
import { FiGlobe, FiDownload, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { scrapeClient } from '../../lib/services/scrapeClient'

export default function ScrapePage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function onScrape(e?: React.FormEvent) {
    e?.preventDefault()
    setError(null)
    setResult(null)

    const u = url.trim()
    if (!u) return setError('Please enter a valid URL')

    setLoading(true)
    try {
      const data = await scrapeClient(u)
      setResult(data)
    } catch (err: any) {
      setError(err?.message || 'Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <form onSubmit={onScrape} className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Scraping...</span>
              </>
            ) : (
              <>
                <FiDownload size={16} />
                <span>Scrape</span>
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
          <FiAlertCircle className="text-red-500 mt-0.5" size={20} />
          <div className="text-red-700">{error}</div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-green-600 mb-4">
            <FiCheckCircle size={20} />
            <span className="font-medium">Successfully scraped website data</span>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm font-medium text-gray-600 mb-1">Page Title</div>
              <div className="text-gray-900 font-semibold truncate">{result.title}</div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm font-medium text-gray-600 mb-1">Meta Description</div>
              <div className="text-gray-900 line-clamp-2">{result.metaDescription}</div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl md:col-span-2">
              <div className="text-sm font-medium text-gray-600 mb-1">Main Heading</div>
              <div className="text-gray-900 font-semibold">{result.h1}</div>
            </div>
          </div>
        </div>
      )}

      {!result && !error && (
        <div className="text-center py-12 text-gray-500">
          <FiGlobe size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">Enter a URL to scrape website data</p>
          <p className="text-sm opacity-75">Get page title, meta description, and main heading</p>
        </div>
      )}
    </div>
  )
}