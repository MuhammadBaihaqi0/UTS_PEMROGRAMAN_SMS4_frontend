import React from 'react'

const statusConfig = {
  pending:   { label: 'Pending',    bg: '#f59e0b22', color: '#f59e0b', dot: '#f59e0b' },
  confirmed: { label: 'Confirmed',  bg: '#10b98122', color: '#10b981', dot: '#10b981' },
  cancelled: { label: 'Cancelled',  bg: '#ef444422', color: '#ef4444', dot: '#ef4444' },
  completed: { label: 'Completed',  bg: '#6366f122', color: '#6366f1', dot: '#6366f1' },
}

export default function Badge({ status }) {
  const cfg = statusConfig[status] || statusConfig.pending
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 12px',
      borderRadius: '999px',
      background: cfg.bg,
      color: cfg.color,
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.03em',
      border: `1px solid ${cfg.color}44`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  )
}
