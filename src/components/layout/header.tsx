'use client';

import { Logo } from '@/components/common';
import Link from 'next/link';
import Image from 'next/image';

type user = {
	id: string;
	name?: string | null;
	email?: string | null;
	image?: string | null;
	uid: string;
} | undefined

export const Header = ({user}:{user:user}) => (
	<header className="bg-primary text-white shadow-md">
		<div className="container mx-auto flex items-center justify-between py-2 px-6">
			<Logo />
			<h1 className="text-lg font-bold text-center flex-grow">ネイル図鑑</h1>
			<nav className="flex gap-6">
				<Link href="/" className="hover:underline">
					Home
				</Link>
				<Link href="/about" className="hover:underline">
					About
				</Link>
				{user ? (
					<Link href="/mypage" className="hover:underline">
						<Image
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							src={user!.image!}
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							alt={user!.name!}
							width={32}
							height={32}
							className="rounded-full"
						/>
					</Link>
				) : (
					<Link href="/login" className="hover:underline">
						Login
					</Link>
				)}
			</nav>
		</div>
	</header>
);
