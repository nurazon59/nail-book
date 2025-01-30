import { numberToFinger } from '@/lib/finger';
import type { Nail } from '@/types';

export const Finger = ({ nail }: { nail: Nail }) => (
	<div className="bg-white shadow-lg rounded-lg p-2 m-2 flex flex-col items-start gap-2">
		<h2 className="text-xl font-bold text-gray-800">
			{numberToFinger(nail.finger)}
		</h2>
		<div className="grid grid-cols-2 gap-2 w-full">
			<Description
				title="Base"
				name={nail.base.name}
				brand={nail.base.brand.name}
				color="bg-blue-100"
			/>
			<Description
				title="Top"
				name={nail.top.name}
				brand={nail.top.brand.name}
				color="bg-green-100"
			/>
			<Description
				title="Color"
				name={nail.color.name}
				brand={nail.color.brand.name}
				color="bg-pink-100"
			/>
			<Description
				title="Art"
				name={nail.art.name}
				brand={nail.art.brand.name}
				color="bg-yellow-100"
			/>
		</div>
	</div>
);

type DescriptionProps = {
	title: string;
	name: string;
	brand: string;
	color: string;
};

const Description = ({ title, name, brand, color }: DescriptionProps) => (
	<div className={`p-2 rounded-lg shadow-xs ${color} flex flex-col`}>
		<span className="text-sm font-medium text-gray-600">{title}</span>
		<span className="text-sm font-bold text-gray-800">{name}</span>
		<span className="text-sm text-gray-500">({brand})</span>
	</div>
);
