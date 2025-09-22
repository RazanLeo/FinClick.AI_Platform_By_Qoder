import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirect to the default Arabic locale
  redirect('/ar')
}