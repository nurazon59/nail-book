import { numberToFinger } from '@/lib/finger';
import type { Nail } from '@/types';

export const Finger = ({ nail }: { nail: Nail }) => (
	<div className="bg-white shadow-lg rounded-lg p-4 m-4 flex">
		<h2 className="w-1/6 flex items-center text-l font-semibold text-gray-800 mb-4">
			{numberToFinger(nail.finger)}
		</h2>
		<div className="flex flex-col gap-4">
			<div className="flex items-center">
				<Description
					title="Base"
					name={nail.base.name}
					brand={nail.base.brand.name}
				/>
				<Description
					title="Top"
					name={nail.top.name}
					brand={nail.top.brand.name}
				/>
			</div>
			<div className="flex items-center">
				<Description
					title="Color"
					name={nail.color.name}
					brand={nail.color.brand.name}
				/>
				<Description
					title="Art"
					name={nail.art.name}
					brand={nail.art.brand.name}
				/>
			</div>
		</div>
	</div>
);

type DescriptionProps = {
	title: string;
	name: string;
	brand: string;
};

const Description = ({ title, name, brand }: DescriptionProps) => (
	<div className="flex items-center">
		<span className="text-gray-600 mr-2">{title}:</span>
		<span className="text-gray-800 font-semibold">{name}</span>
		<span className="text-gray-600 font-medium ml-2">({brand})</span>
	</div>
);
