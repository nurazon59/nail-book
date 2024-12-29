'use client';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => (
	<div className="flex items-center gap-2">
		<Link aria-label="Home" href="/">
			<Image alt="logo" height={48} src="/logo.png" width={48} />
		</Link>
	</div>
);
