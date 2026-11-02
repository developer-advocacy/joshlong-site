// for the platform's health check. it doesn't touch the api: a slow api shouldn't get this restarted.
export default defineEventHandler(() => 'ok')
