// types/next-auth.d.ts 

import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string | null // Custom role field added to session
    }
  }

  interface User {
    role?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string | null // Custom role field added to JWT token
  }
}
