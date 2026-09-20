import Head from 'next/head'

import { buildFaqJsonLd, buildHowToJsonLd } from '../lib/schema'

const NAME = "MockDeck"

const faqs = [
  {
    "question": "What is MockDeck?",
    "answer": "MockDeck generates realistic mock APIs from a schema, a spec, or a one-line description, so frontend and agent teams can build and demo against stable fakes instead of waiting on backend endpoints."
  },
  {
    "question": "What do I give it?",
    "answer": "Either a schema or spec you already have, or a short description of the endpoints and shapes you need. The more specific the input, the closer the mock will match what the backend will return."
  },
  {
    "question": "Does it replace the backend?",
    "answer": "No. A mock is a stand-in that lets you build in parallel. The real service is still the source of truth, and the mock should be swapped out once endpoints exist."
  },
  {
    "question": "Is the mock data real?",
    "answer": "No — responses are synthetic and generated to look plausible. Do not use mock data for analytics, compliance evidence, or anything a user would rely on."
  },
  {
    "question": "Who is it for?",
    "answer": "Frontend developers and agent builders who need a predictable endpoint today, and teams demoing a flow before the integration is finished."
  },
  {
    "question": "What are the limits?",
    "answer": "It does not validate your production contract, and it will not catch errors that only appear against real services. Keep a contract test for the integration itself."
  }
] as { question: string; answer: string }[]

const howToBlocks = [
  {
    "name": "Stand up a mock API with MockDeck",
    "steps": [
      {
        "name": "Describe the API",
        "text": "Give a schema or spec, or describe the endpoints and response shapes in one line."
      },
      {
        "name": "Generate the mock",
        "text": "Create the mock API and check that the response shapes match what you expect."
      },
      {
        "name": "Build against it",
        "text": "Point your frontend or agent at the mock and build the flow end to end."
      },
      {
        "name": "Swap in the real service",
        "text": "Replace the mock once the real endpoints exist and keep a contract test."
      }
    ]
  }
] as { name: string; steps: { name: string; text: string }[] }[]

const posts = [
  { title: "What is MockDeck — and when to use it", type: "HowTo", desc: "What a mock API is for, and the signs your team is blocked waiting on endpoints." },
  { title: "How to stand up a mock API in 10 minutes", type: "HowTo", desc: "Describe, generate, build, swap — the shortest useful path." },
  { title: "What is Common API mocking mistakes (and how to avoid them)?", type: "FAQPage", desc: "Treating mock data as real, skipping contract tests, and mocking too late to help." },
  { title: "How does Mocking an API compare to waiting for the backend?", type: "Article", desc: "Parallel work, demo risk, and where a mock stops paying for itself." },
] as { title: string; type: string; desc: string }[]

const glance = [
  "Input: a schema or spec, or a one-line description of the API",
  "Output: a realistic mock API your frontend or agent can call immediately",
  "Best for: frontend and agent teams blocked on backend endpoints",
  "Limits: the data is synthetic — a mock is a stand-in, not a contract or a test suite",
]

const articlesJsonLd = posts
  .filter((p) => p.type === 'Article')
  .map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.desc,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: NAME },
    publisher: { '@type': 'Organization', name: NAME },
    about: NAME,
  }))

export default function Page() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://apimock.lxsaihub.com/blog" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqs)) }}
        />
        {howToBlocks.map((block, i) => (
          <script
            key={`howto-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(buildHowToJsonLd(block.name, block.steps)),
            }}
          />
        ))}
        {articlesJsonLd.map((a, i) => (
          <script
            key={`article-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(a) }}
          />
        ))}

        <title>{NAME} — Blog</title>
        <meta name="description" content={{NAME} + ' — definitional and how-to posts, with the honest limits.'} />
      </Head>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <header className="border-b border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="/" className="font-bold text-slate-900">{NAME}</a>
            <nav className="hidden md:flex gap-6 text-sm font-semibold text-slate-500">
              <a href="/use-cases" className="hover:text-slate-900">Use cases</a>
              <a href="/integrations" className="hover:text-slate-900">Integrations</a>
              <a href="/how-it-works" className="hover:text-slate-900">How it works</a>
              <a href="/security" className="hover:text-slate-900">Security</a>
              <a href="/blog" className="hover:text-slate-900">Blog</a>
            </nav>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-6 py-14">
          <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
          <p className="mt-3 text-slate-600">Generate a mock API from a one-line description and build before the backend exists.</p>

          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">What does {NAME} include at a glance?</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc pl-5">
              {glance.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </section>

          <h2 className="text-2xl font-bold mt-12 text-slate-900">What do people ask about {NAME}?</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
              <details key={f.question} className="rounded-xl border border-slate-200 bg-white p-4">
                <summary className="font-semibold cursor-pointer text-slate-900">{f.question}</summary>
                <p className="mt-2 text-sm text-slate-600">{f.answer}</p>
              </details>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-2 text-slate-900">Which deep-dives should you read first?</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {posts.map((p) => (
              <article key={p.title} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="text-xs font-semibold text-indigo-600 mb-1">{p.type}</div>
                <h3 className="font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
              </article>
            ))}
          </div>
        </main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto px-6 py-8 text-sm text-slate-500 flex flex-wrap gap-6">
            <a href="/security" className="hover:text-slate-900">Security</a>
            <a href="/use-cases" className="hover:text-slate-900">Use cases</a>
            <a href="/integrations" className="hover:text-slate-900">Integrations</a>
            <a href="/how-it-works" className="hover:text-slate-900">How it works</a>
            <a href="/blog" className="hover:text-slate-900">Blog</a>
          </div>
        </footer>
      </div>
    </>
  )
}
