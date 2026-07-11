import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiHardDrive, FiMonitor, FiServer, FiShield, FiWifi } from 'react-icons/fi'
import networkData from '@/data/network.json'
import type { NetworkNode, NetworkNodeType, NetworkTopologyData } from '@/types'

const data = networkData as NetworkTopologyData

const NODE_ICON: Record<NetworkNodeType, typeof FiServer> = {
  client: FiMonitor,
  switch: FiHardDrive,
  firewall: FiShield,
  router: FiWifi,
  server: FiServer,
}

const NODE_COLOR: Record<NetworkNodeType, string> = {
  client: '#94a3b8',
  switch: '#3FC6FF',
  firewall: '#f87171',
  router: '#8B5CF6',
  server: '#22D3A6',
}

function findNode(id: string) {
  return data.nodes.find((n) => n.id === id) as NetworkNode
}

export default function NetworkTopology() {
  const [active, setActive] = useState<NetworkNode | null>(null)

  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      <div className="overflow-x-auto">
        <svg viewBox="0 0 800 460" className="h-[380px] w-full min-w-[720px]">
          {data.links.map((link, i) => {
            const from = findNode(link.from)
            const to = findNode(link.to)
            return (
              <motion.line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="rgba(148,163,184,0.25)"
                strokeWidth={1.5}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            )
          })}

          {data.nodes.map((node, i) => {
            const Icon = NODE_ICON[node.type]
            const color = NODE_COLOR[node.type]
            const isActive = active?.id === node.id
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                onMouseEnter={() => setActive(node)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer"
              >
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isActive ? 26 : 22}
                  fill="rgba(11,15,20,0.9)"
                  stroke={color}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  animate={isActive ? { r: [22, 27, 24] } : {}}
                  transition={{ duration: 0.6 }}
                />
                <foreignObject x={node.x - 10} y={node.y - 10} width={20} height={20}>
                  <div className="flex h-5 w-5 items-center justify-center" style={{ color }}>
                    <Icon size={14} />
                  </div>
                </foreignObject>
                <text
                  x={node.x}
                  y={node.y + 40}
                  textAnchor="middle"
                  className="fill-slate-400 font-mono"
                  fontSize="11"
                >
                  {node.label}
                </text>
              </motion.g>
            )
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 border-t border-white/5 pt-4">
        {data.legend.map((item) => {
          const Icon = NODE_ICON[item.type]
          return (
            <div
              key={item.type}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                active?.type === item.type
                  ? 'border-neon-blue/50 text-white'
                  : 'border-white/10 text-slate-400'
              }`}
            >
              <Icon style={{ color: NODE_COLOR[item.type] }} />
              {item.label}
            </div>
          )
        })}
      </div>
      <p className="mt-3 min-h-[20px] font-mono text-xs text-slate-500">
        {active ? data.legend.find((l) => l.type === active.type)?.detail : 'Hover a node for details.'}
      </p>
    </div>
  )
}
