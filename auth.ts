import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                console.log("Authorize called with:", credentials);
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                console.log("Parsing success:", parsedCredentials.success);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    console.log(`Checking: ${email} vs admin@elxir.ma`);
                    // Hardcoded Admin Credentials
                    // Ideally move these to ENV variables
                    if (email === 'admin@elxir.ma' && password === 'admin123') {
                        console.log("Success!");
                        return {
                            id: 'admin-1',
                            name: 'Admin Elxir',
                            email: 'admin@elxir.ma',
                        };
                    }
                }
                console.log("Auth Failed");
                return null;
            },
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
        async jwt({ token, user }) {
            if (user) {
                token.role = 'ADMIN';
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.role) {
                // @ts-ignore
                session.user.role = token.role;
            }
            return session;
        }
    }
});
