import { Box } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => (
	<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
		<Link aria-label="Home" href="/">
			<Image alt="logo" height={48} src="/logo.png" width={48} />
		</Link>
	</Box>
);
