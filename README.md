# pizzamaker-fe

React frontend for the PizzaMaker project

Part of the [pizzamaker](https://github.com/cfioretti/pizzamaker-local) ecosystem. The recommended way to run it is from the parent project:

```bash
make start          # starts all services including the frontend
make rebuild        # rebuild after code changes
```

The frontend is then available at [http://localhost:3000](http://localhost:3000).

## Standalone development

If you need to work on the frontend in isolation:

```bash
npm install
npm start           # http://localhost:3000
```

The backend API (Traefik gateway) must be reachable at the URL configured in `REACT_APP_API_BASE_URL`.

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `REACT_APP_API_BASE_URL` | `http://localhost:8000/api/v1` | Base URL for all backend API calls (Traefik gateway) |

The default works out of the box with `pizzamaker-local`. Override it by copying `.env.example` to `.env` only if you need a different value.

## Tech stack

- React 16 (Create React App)
- Material-UI v4
- Axios
