# HOTS Random 2.0

Web app for random hero selection in Heroes of the Storm.

## Production

- Frontend: https://hots-random-2-0.vercel.app
- Backend: https://hots-random-api.onrender.com
- Database: Supabase

## Architecture

The project uses a hybrid data flow:

- hero list is loaded through the backend API
- full random hero is loaded through the backend API
- filtered random hero is fetched directly from Supabase
- pool random hero is fetched directly from Supabase

## Stack

- React
- Vite
- SCSS
- Express
- Supabase
- PostgreSQL

## Environment Variables

### Client

- `VITE_API_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

## Notes

This project is built for online deployment, not only for local usage.
Frontend is deployed on Vercel, backend on Render, and data is stored in Supabase.
