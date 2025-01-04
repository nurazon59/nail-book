'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import './globals.css';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="h-full">
			<body className="h-full">
				<SessionProvider>
					<SessionWrapper>{children}</SessionWrapper>
				</SessionProvider>
			</body>
		</html>
	);
}

function SessionWrapper({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();
	if (status === 'loading') {
		return (
			<div className="flex h-full w-full items-center justify-center">
				Loading...
			</div>
		);
	}

	return (
		<>
			<Header user={session?.user}/>
			<main className="m-auto flex-1 flex-col items-center justify-center container p-4 min-h-full">
				{children}
			</main>
			<Footer />
		</>
	);
}
