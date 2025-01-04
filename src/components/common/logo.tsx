'use client';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => (
	<div className="flex items-center">
		<Link aria-label="Home" href="/">
			<Image alt="logo" height={32} src="/logo.png" width={32} />
		</Link>
	</div>
);
