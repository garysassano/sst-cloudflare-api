# sst-cloudflare-api

SST app that deploys an API to Cloudflare.

## Prerequisites

- **_Cloudflare:_**
  - Must have set the `CLOUDFLARE_API_TOKEN` variable in your local environment.
- **_pnpm:_**
  - Must be [installed](https://pnpm.io/installation) in your system.

## Installation

```sh
pnpm install
```

## Deployment

```sh
pnpx sst deploy
```

## Usage

1. Grab the `<WORKER_ROUTE_URL>` from the deployment outputs:

   ```sh
   ✔  Complete
      url: <WORKER_ROUTE_URL>
   ```

2. Upload the `package.json` to the R2 bucket using your API endpoint:

   ```sh
   curl -H "Content-Type: application/json" -T "package.json" <WORKER_ROUTE_URL>
   ```

3. Navigate to `<WORKER_ROUTE_URL>` to see the uploaded `package.json` file.

## Cleanup

```sh
pnpx sst remove
```
