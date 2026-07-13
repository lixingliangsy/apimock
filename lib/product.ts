export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "APIMock",
  slug: "apimock",
  tagline: "Generate a mock API from a one-line description.",
  description: "Describe an endpoint and get a mock API spec - OpenAPI 3, Postman, or raw routes - with realistic sample responses so your frontend team can build before the backend is ready.",
  toolTitle: "Mock an API",
  resultLabel: "Your mock spec",
  ctaLabel: "Generate mock",
  features: [
  "One-line description to mock spec",
  "OpenAPI 3 / Postman / raw",
  "Realistic sample responses",
  "Auth style included"
],
  inputs: [
  {
    "key": "endpoint_desc",
    "label": "Describe the endpoint",
    "type": "textarea",
    "placeholder": "e.g. GET /orders returns a list of orders with id, total, status"
  },
  {
    "key": "format",
    "label": "Output format",
    "type": "select",
    "options": [
      "OpenAPI 3",
      "Postman",
      "Raw routes"
    ]
  },
  {
    "key": "auth",
    "label": "Auth style",
    "type": "select",
    "options": [
      "None",
      "API key",
      "Bearer token"
    ]
  }
] as InputField[],
  systemPrompt: "You are an API designer. Given a one-line endpoint description, an output format, and an auth style, produce a mock API specification with realistic sample responses and the chosen auth. Keep it copy-paste ready. In demo (mock) mode, return a realistic sample spec following exactly this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "5 mocks/mo"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "Unlimited, save history"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const d = (inputs['endpoint_desc'] || '').trim()
  const f = inputs['format'] || 'OpenAPI 3'
  const auth = inputs['auth'] || 'None'
  if (!d) return 'Describe an endpoint to generate a mock API.'
  let out = 'MOCK API (' + f + ', auth: ' + auth + ')\n\n'
  out += 'GET /orders\n'
  out += '200 OK\n'
  out += '{\n  "data": [\n'
  out += '    { "id": "ord_1", "total": 42.0, "status": "paid" },\n'
  out += '    { "id": "ord_2", "total": 9.5, "status": "pending" }\n'
  out += '  ]\n}\n\n'
  out += 'Auth: ' + (auth === 'None' ? 'open endpoint' : auth + ' expected in header') + '\n'
  out += '\n--- (Mock demo. Describe your endpoint for a tailored mock.)'
  return out
}
}
