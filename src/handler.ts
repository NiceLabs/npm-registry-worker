// The is GitHub Personal Token as `read:package` permission
declare const API_TOKEN: string
// If the variable exists, access root path redirect to target
declare const HOMEPAGE_URL: string

const ALLOWED_METHODS = ['GET', 'POST']
const METHOD_NOT_ALLOWED = new Response('Method Not Allowed', { status: 405 })

export async function handleRequest(request: Request): Promise<Response> {
  if (!ALLOWED_METHODS.includes(request.method)) return METHOD_NOT_ALLOWED
  const url = new URL(request.url)
  const host = url.host
  url.host = 'npm.pkg.github.com'
  const headers = handleHeaders(request.headers)
  if (url.pathname === '/' && typeof HOMEPAGE_URL === 'string') {
    return Response.redirect(HOMEPAGE_URL, 302)
  } else if (url.pathname.startsWith('/download')) {
    return fetch(url.toString(), { headers })
  } else {
    const response = await fetch(url.toString(), { headers })
    const text = await response.text()
    const modified = text.replaceAll(url.host, host)
    return new Response(modified, response)
  }
}

function handleHeaders(headers: Headers) {
  headers = new Headers(headers)
  headers.set('Accept-Encoding', 'gzip')
  headers.set('Authorization', `Bearer ${API_TOKEN}`)
  return headers
}
