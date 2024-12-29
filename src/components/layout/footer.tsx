import Link from 'next/link';

export const Footer = () => (
	<div className="fixed bottom-0 w-full bg-primary p-2">
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
