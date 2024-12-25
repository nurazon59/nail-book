/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";

export default function RootLayout({
	children,
	session,
}: {
	children: React.ReactNode;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	session: any;
}) {
	return (
		<html lang="en">
			<body>
				<SessionProvider session={session}>{children}</SessionProvider>
			</body>
		</html>
	);
}
