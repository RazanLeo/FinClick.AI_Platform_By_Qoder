export default function TestLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <div>
      <h1>Test Layout</h1>
      <p>Locale: {params.locale}</p>
      {children}
    </div>
  )
}