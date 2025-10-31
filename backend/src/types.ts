export interface Env {
  DB: D1Database;
}

export type Variables = {
  user: {
    id: string
    email: string
  }
}