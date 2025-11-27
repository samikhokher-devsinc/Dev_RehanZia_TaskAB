import { NextResponse } from 'next/server'
import { FaqRepository } from '../../../lib/repositories/faqRepository'

type Req = { query?: string }

function scoreText(target: string, terms: string[]) {
    const text = target.toLowerCase()
    let score = 0
    for (const t of terms) {
        if (!t) continue
        const escaped = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(escaped, 'gi')
        const matches = text.match(regex)
        if (matches) score += matches.length
    }
    return score
}

export async function POST(req: Request) {
    const body = (await req.json().catch(() => ({}))) as Req
    const q = (body.query || '').trim()
    if (!q) return NextResponse.json({ error: 'Query required!' }, { status: 400 })

    const repo = new FaqRepository()
    const faqs = await repo.getAll()

    const terms = q.toLowerCase().split(/\s+/)

    const scored = faqs
        .map(f => {
            const titleScore = scoreText(f.title, terms)
            const bodyScore = scoreText(f.body, terms)
            const total = titleScore * 2 + bodyScore
            return { item: f, score: total }
        })
        .filter(s => s.score > 0)

    if (scored.length === 0)
        return NextResponse.json({ results: [], message: 'No matches found' })

    scored.sort((a, b) => b.score - a.score)

    const top = scored.slice(0, 3).map(s => ({
        id: s.item.id,
        title: s.item.title,
        snippet: s.item.body.slice(0, 160)
    }))

    const sources = top.map(t => t.id)
    const combined = top.map(t => `${t.title}: ${t.snippet}`).join(' ')
    const summary = combined.split(/[.?!]+/).slice(0, 3).join('. ').trim()

    return NextResponse.json({ results: top, summary, sources })
}

export async function GET() {
  return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
}
