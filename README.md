# `@nice-labs/npm-registry-worker`

[GitHub Packages](https://github.com/features/packages) ([npm Registry](https://www.npmjs.com)) Readonly Worker

## Install Wrangler

See <https://developers.cloudflare.com/workers/wrangler/get-started/>

## Deployment

```console
$ export CLOUDFLARE_ACCOUNT_ID="..."

$ # (required) The is GitHub Personal Token as `read:package` permission
$ wrangler secret put API_TOKEN
Enter a secret value: ghp_***

$ # (optional) If exists, access root path redirect to homepage
$ wrangler secret put HOMEPAGE_URL
Enter a secret value: ***

$ # (optional) Limit npm scope
$ wrangler secret put NPM_SCOPE
Enter a secret value: ***

$ wrangler publish --name npm-registry
Running custom build: npm run build
...
Uploaded npm-registry (2.88 sec)
Published npm-registry (1.75 sec)
  https://npm-registry.***.workers.dev
```

## LICENSE

[MIT LICENSE](LICENSE)
