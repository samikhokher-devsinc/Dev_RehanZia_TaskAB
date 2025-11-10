'use client'
import { useState, useRef } from 'react'
import { FiSearch, FiFileText, FiAlertTriangle, FiZap, FiBarChart2, FiCpu } from 'react-icons/fi'
import { searchClient } from '../lib/services/searchClient'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[] | null>(null)
  const [summary, setSummary] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function onSearch(e?: React.FormEvent) {
    e?.preventDefault()
    setError(null)
    setResults(null)
    setSummary(null)

    const q = query.trim()
    if (!q) return setError('Please enter a search query to begin analysis')

    setLoading(true)
    try {
      const data = await searchClient(q)
      setResults(data.results || [])
      setSummary(data.summary || null)
    } catch (err: any) {
      setError(err?.message || 'Network connectivity issue detected')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      onSearch()
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/10 rounded-2xl">
            <FiCpu className="text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-200">Neural Search</h2>
            <p className="text-slate-400 text-sm">AI-powered semantic analysis engine</p>
          </div>
        </div>
        {results && (
          <div className="flex items-center space-x-2 bg-slate-800/50 rounded-2xl px-4 py-2 border border-slate-700">
            <FiBarChart2 className="text-green-400" size={16} />
            <span className="text-slate-300 text-sm font-medium">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </span>
          </div>
        )}
      </div>

      <form onSubmit={onSearch} className="mb-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
          <div className="relative flex gap-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 p-2 backdrop-blur-sm">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your search query for AI analysis..."
                className="w-full pl-12 pr-4 py-4 bg-transparent text-slate-200 placeholder-slate-500 border-none focus:outline-none focus:ring-0 text-lg"
                disabled={loading}
              />
            </div>
            <button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg shadow-blue-500/25"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <FiZap size={18} />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mb-6 p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-4">
          <FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" size={24} />
          <div>
            <div className="text-red-400 font-semibold mb-1">Analysis Error</div>
            <div className="text-red-300 text-sm">{error}</div>
          </div>
        </div>
      )}

      {results === null && !error && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="p-4 bg-slate-800/50 rounded-3xl inline-flex mb-6 border border-slate-700/50">
              <FiFileText size={48} className="text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-3">Begin Semantic Search</h3>
            <p className="text-slate-500 leading-relaxed">
              Enter a query above to leverage our AI-powered search engine for intelligent document analysis and contextual understanding.
            </p>
          </div>
        </div>
      )}

      {/* AI Summary */}
      {summary && (
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <FiZap className="text-blue-400" size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <div className="text-blue-400 font-semibold">AI Insight</div>
                <div className="px-2 py-1 bg-blue-500/20 rounded-lg text-blue-300 text-xs font-medium">
                  Generated Summary
                </div>
              </div>
              <div className="text-slate-200 leading-relaxed text-lg">{summary}</div>
            </div>
          </div>
        </div>
      )}

      {results && results.length === 0 && (
        <div className="text-center py-12">
          <div className="p-4 bg-slate-800/50 rounded-3xl inline-flex mb-4 border border-slate-700/50">
            <FiSearch size={32} className="text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No Matches Found</h3>
          <p className="text-slate-500">Try refining your search terms for better results</p>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="space-y-4">
          <div className="grid gap-4">
            {results.map((r, index) => (
              <article 
                key={r.id} 
                className="group p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl hover:border-blue-500/30 hover:bg-slate-800/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-200 group-hover:text-blue-400 transition-colors duration-300">
                    {r.title}
                  </h3>
                  <div className="px-2 py-1 bg-slate-700/50 rounded-lg text-slate-400 text-xs font-medium">
                    #{index + 1}
                  </div>
                </div>
                <p className="text-slate-400 leading-relaxed line-clamp-3">
                  {r.snippet}...
                </p>
                <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-slate-700/30">
                  <div className="flex items-center space-x-1 text-slate-500 text-sm">
                    <FiBarChart2 size={14} />
                    <span>Relevance: {((1 - index / results.length) * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}