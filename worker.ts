// (required) The is GitHub Personal Token as `read:package` permission
declare const API_TOKEN: string
// (optional) If exists, access root path redirect to homepage
declare const HOMEPAGE_URL: string
// (optional) If exists, limit npm scope
declare const NPM_SCOPE: string

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request: Request): Promise<Response> {
  if (request.method !== 'GET') return makeError('Method Not Allowed', 405)
  const url = new URL(request.url)
  const host = url.host
  url.host = 'npm.pkg.github.com'
  const headers = handleHeaders(request.headers)
  if (url.pathname === '/' && typeof HOMEPAGE_URL === 'string') {
    return Response.redirect(HOMEPAGE_URL, 302)
  } else if (url.pathname.startsWith('/download')) {
    return fetch(url.toString(), { headers })
  } else if (url.pathname === '/-/ping') {
    return new Response('', { status: 204 })
  } else if (url.pathname.startsWith('/-/')) {
    return makeError('Method Not Allowed', 405)
  } else if (limitScope(url.pathname)) {
    const response = await fetch(url.toString(), { headers })
    const text = await response.text()
    const modified = text.replaceAll(url.host, host)
    return new Response(modified, response)
  }
  return makeError('Not Found', 404)
}

function limitScope(pathname: string) {
  if (typeof NPM_SCOPE !== 'string') return true
  const scope = pathname.slice(1, pathname.indexOf('%2F'))
  return scope === NPM_SCOPE
}

function handleHeaders(headers: Headers) {
  headers = new Headers(headers)
  headers.set('accept', 'application/json')
  headers.set('accept-encoding', 'gzip')
  headers.set('authorization', `Bearer ${API_TOKEN}`)
  return headers
}

function makeError(error: unknown, status: number) {
  return new Response(JSON.stringify({ error }), { status })
}
