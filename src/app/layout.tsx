'use client';

import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

export default function RootLayout({
	children,
	session,
}: {
	children: React.ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	session: any;
}) {
	return (
		<html lang="en" className="h-full">
			<body className="h-full">
				<SessionProvider session={session}>
					<Header />
					<main className="flex flex-1 flex-col items-center justify-center py-8 px-4">
						{children}
					</main>
					<Footer />
				</SessionProvider>
			</body>
		</html>
	);
}
