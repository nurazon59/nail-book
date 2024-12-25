'use client';

import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Box, ThemeProvider } from '@mui/material';
import { theme } from '@/lib/theme';
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
		<html lang="en">
			<body>
				<ThemeProvider theme={theme}>
					<AppRouterCacheProvider>
						<SessionProvider session={session}>
							<Header />
							<Box
								sx={{
									paddingBlock: 8,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
								}}
							>
								{children}
							</Box>
							<Footer />
						</SessionProvider>
					</AppRouterCacheProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
