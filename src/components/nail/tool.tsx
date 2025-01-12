import type { Tool } from '@/types';
import Image from 'next/image';

export const NailTool = ({
	prop,
	title,
}: {
	prop: Tool;
	title: string;
}) => {
	const { name, image } = prop;
	return (
		<div>
			<h2>{title}</h2>
			<h3>{name}</h3>
			<Image src={image} alt={name} />
		</div>
	);
};
