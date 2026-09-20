/** API mock rules - OpenAPI/Postman contract-first mocks. */
export const RULESET_VERSION = 'api-mock@2026-07-20'

export type RuleHit = {
  id: string
  title: string
  severity: 'low' | 'medium' | 'high'
  passed: boolean
  remediation?: string
  ref?: string
}

export function runDeterministicChecks(inputs: Record<string, string>): RuleHit[] {
  const desc = (inputs.endpoint_desc || inputs.description || '').trim()
  const fmt = (inputs.format || '').trim()
  const auth = (inputs.auth || '').trim()
  return [
    {
      id: 'AM-01',
      title: 'Endpoint description present',
      severity: 'high',
      passed: desc.length >= 12,
      remediation: 'Describe method, path, and response fields for the mock.',
      ref: 'https://spec.openapis.org/oas/v3.1.0',
    },
    {
      id: 'AM-02',
      title: 'Output format selected',
      severity: 'medium',
      passed: fmt.length >= 3,
      remediation: 'Choose OpenAPI 3 / Postman / raw routes.',
      ref: 'https://learn.openapis.org/best-practices.html',
    },
    {
      id: 'AM-03',
      title: 'Auth style noted',
      severity: 'medium',
      passed: auth.length >= 2 || /auth|bearer|api.?key|oauth/i.test(desc),
      remediation: 'State none / API key / Bearer / OAuth so mocks mirror securitySchemes.',
      ref: 'https://spec.openapis.org/oas/v3.1.0',
    },
    {
      id: 'AM-04',
      title: 'Sample response expected',
      severity: 'high',
      passed: true,
      remediation: 'Include realistic example payloads (OpenAPI examples / examples keyword).',
      ref: 'https://learn.openapis.org/best-practices.html',
    },
    {
      id: 'AM-05',
      title: 'Mock is not production contract',
      severity: 'high',
      passed: true,
      remediation: 'Label output as mock/stub — not a guarantee of backend behavior.',
      ref: 'https://learn.openapis.org/best-practices.html',
    },
    {
      id: 'AM-06',
      title: 'Path-like resource named',
      severity: 'low',
      passed: /\/[A-Za-z0-9_\-{}]+/.test(desc) || desc.length === 0,
      remediation: 'Include a /resource path so frontend routing can bind early.',
      ref: 'https://spec.openapis.org/oas/v3.1.0',
    },
  ]
}
