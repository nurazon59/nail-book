'use client';

import { Logo } from '@/components/common';
import Link from 'next/link';

export const Header = () => (
	<header className="bg-primary text-white shadow-md">
		<div className="container mx-auto flex items-center justify-between py-4 px-6">
			<Logo />
			<h1 className="text-lg font-bold text-center flex-grow">ネイル図鑑</h1>
			<nav className="flex gap-6">
				<Link href="/" className="hover:underline">
					Home
				</Link>
				<Link href="/about" className="hover:underline">
					About
				</Link>
			</nav>
		</div>
	</header>
);
