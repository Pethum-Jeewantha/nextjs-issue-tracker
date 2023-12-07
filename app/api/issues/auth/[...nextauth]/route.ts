import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [],
    session: {
        strategy: "jwt"
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
