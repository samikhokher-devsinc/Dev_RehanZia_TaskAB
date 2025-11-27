import './globals.css'
import NavTabs from './nav-tabs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:4px_4px]"></div>
        <main className="relative max-w-6xl mx-auto px-4 py-8">
          <header className="mb-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700/50 p-8 mb-6 shadow-2xl shadow-blue-500/5 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                    Data Intelligence Platform
                  </h1>
                  <p className="text-slate-400 text-lg font-light">
                    Advanced search analytics & web extraction suite case
                  </p>
                </div>
                <div className="flex items-center space-x-2 bg-slate-800/50 rounded-2xl px-4 py-2 border border-slate-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-300 text-sm font-medium">System Online</span>
                </div>
              </div>
            </div>
            <NavTabs />
          </header>
          <section className="bg-slate-900/80 rounded-3xl border border-slate-700/50 shadow-2xl shadow-blue-500/5 backdrop-blur-sm overflow-hidden">
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}