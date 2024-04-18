# sst-cloudflare-api

SST app that deploys an API to Cloudflare.

## Prerequisites

- **_Cloudflare:_**
  - Must have set the `CLOUDFLARE_API_TOKEN` variable in your local environment.
- **_SST Ion:_**
  - Must be [installed](https://ion.sst.dev/docs/reference/cli/) in your system.
- **_pnpm:_**
  - Must be [installed](https://pnpm.io/installation) in your system.

## Installation

```sh
pnpm install
```

## Deployment

```sh
sst deploy
```

## Usage

1. Grab the `<WORKER_ROUTE_TRIGGER_URL>` from the deployment outputs:

   ```sh
   ✔  Complete
      url: <WORKER_ROUTE_TRIGGER_URL>
   ```

2. Upload the `package.json` to an R2 bucket using your API endpoint:

   ```sh
   curl --upload-file package.json <WORKER_ROUTE_TRIGGER_URL>
   ```

3. Navigate to `<WORKER_ROUTE_TRIGGER_URL>` to see the uploaded `package.json` file.

## Cleanup

```sh
sst remove
```
