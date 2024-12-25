import { Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';

export const Link = ({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) => {
	return (
		<MuiLink
			color="inherit"
			component={NextLink}
			href={href}
			sx={{ fontWeight: '500' }}
			underline="hover"
		>
			{children}
		</MuiLink>
	);
};
