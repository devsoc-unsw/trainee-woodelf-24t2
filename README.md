# yellowshirt 👕💛

by alyssa, ben, chris, lachlan, and osvaldo

> geoguessr but cool and unsw and supports ending world hunger

## installation

1. `cd backend && pnpm i`
2. set the following value in `backend/.env`:

```bash
SESSION_SECRET=
NODE_ENV=
ALLOWED_ORIGINS=/commaseparated/,/regexes/
```

NODE_ENV is usually either 'development' or 'production' 3. `cd ../frontend && pnpm i` 4. set the following values in `frontend/.env`:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

5. _optionally_, create a .env file at the root of the repository which contains a cloudflare deploy book endpoint.

```
echo "https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/ENDPOINT_GOES_HERE" > .env
```

you can now use the `rebuild` script in the root of the repository to initiate manual deployments without having to push changes to `main`.

## level editor

you can create your own yellowshirt levels (or, more precisely, _maps_ composed of _levels_) using the [panoproc](https://github.com/lachlanshoesmith/panoproc) level editor. installation and usage instructions can be found in that repository's readme.
