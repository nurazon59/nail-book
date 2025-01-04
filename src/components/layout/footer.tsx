import Link from 'next/link';

export const Footer = () => (
	<div className="w-full bg-primary p-2">
		<div className="flex justify-center items-center">
			<Link
				href="https://itk-koshiishi.net/"
				className="text-white no-underline hover:underline"
			>
				© 2024 Nekoyatu
			</Link>
		</div>
	</div>
);
