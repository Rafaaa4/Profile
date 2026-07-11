import Section from '@/components/Section'
import NetworkTopology from '@/components/NetworkTopology'

export default function NetworkSection() {
  return (
    <Section
      id="network"
      eyebrow="Network"
      title="How the traffic actually flows"
      description="A simplified topology of the kind of small-office network I plan and maintain — hover any device to see its role."
    >
      <NetworkTopology />
    </Section>
  )
}
