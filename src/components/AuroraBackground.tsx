export default function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div
        className="aurora-blob animate-drift-a h-[40vw] w-[40vw] bg-accent"
        style={{ top: '-10%', left: '-5%' }}
      />
      <div
        className="aurora-blob animate-drift-b h-[35vw] w-[35vw] bg-accent-2"
        style={{ top: '20%', right: '-10%' }}
      />
      <div
        className="aurora-blob animate-drift-c h-[30vw] w-[30vw] bg-accent"
        style={{ bottom: '-10%', left: '25%' }}
      />
    </div>
  )
}
