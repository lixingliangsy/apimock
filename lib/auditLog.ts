import fs from 'fs'
import path from 'path'

export function audit(event: string, meta: Record<string, unknown> = {}) {
  const dir = path.join(process.cwd(), '.data', 'audit')
  try { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }) } catch (e) { /* read-only FS (serverless): best effort */ }
  const line = { ts: new Date().toISOString(), event, ...meta }
  try { fs.appendFileSync(path.join(dir, 'audit.jsonl'), JSON.stringify(line) + '\n', 'utf8') } catch (e) { /* read-only FS (serverless): best effort */ }
}

export type AuditEntry = {
  ts?: string
  runId?: string
  step?: string
  model?: string
  quota?: Record<string, unknown>
  event?: string
  detail?: string
}

/** Append a per-slug audit entry (used by pages/api/tool.ts). Best-effort only. */
export function appendAudit(slug: string, entry: AuditEntry) {
  try {
    const dir = path.join(process.cwd(), '.data', 'audit')
    fs.mkdirSync(dir, { recursive: true })
    fs.appendFileSync(path.join(dir, `${slug}.jsonl`), JSON.stringify(entry) + '\n', 'utf8')
  } catch (e) { /* read-only FS (serverless): best effort */ }
}
