import { db } from "@/lib/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	callbacks: {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		async signIn(user: any) {
			const { email } = user.user;
			await db.user.upsert({
				where: { email },
				update: {},
				create: {
					name: user.user.name,
					email: user.user.email,
					image: user.user.image,
					admin: false,
				},
			});

			return true;
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		async session({ session, token }: any) {
			session.accessToken = token.accessToken;

			session.user.id = token.id;
			session.user.uid = token.uid;

			return session;
		},

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		async jwt({ token, user }: any) {
			if (user) {
				const userExist = await db.user.findUnique({
					where: {
						email: user.email,
					},
				});
				token.uid = userExist?.id;
				token.accessToken = user.access_token;
			}
			return token;
		},
	},
	pages: {
		signIn: "/auth/signin",
	},
	secret: process.env.NEXTAUTH_SECRET || "",
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
