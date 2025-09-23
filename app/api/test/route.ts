export async function GET() {
  return new Response('API test working', {
    headers: {
      'content-type': 'text/plain',
    },
  })
}