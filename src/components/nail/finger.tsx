import type { Nail } from '@/types';
import { Hand, Paintbrush, Palette, Star } from 'lucide-react';

export const Finger = ({ nail }: { nail: Nail }) => (
	<div className="bg-white shadow-md rounded-lg p-6 m-4">
		<h2 className="text-xl font-bold mb-4 flex items-center">
			<Hand className="text-red-500 mr-2" /> {nail.finger}
		</h2>
		<div className="space-y-2">
			<div className="flex items-center">
				<Star className="text-yellow-500 mr-2" />
				<span>
					{nail.base.brand.name} {nail.base.name}
				</span>
			</div>
			<div className="flex items-center">
				<Palette className="text-blue-500 mr-2" />
				<span>
					{nail.color.brand.name} {nail.color.name}
				</span>
			</div>
			<div className="flex items-center">
				<Paintbrush className="text-green-500 mr-2" />
				<span>
					{nail.art.brand.name} {nail.art.name}
				</span>
			</div>
			<div className="flex items-center">
				<Star className="text-yellow-500 mr-2" />
				<span>
					{nail.top.brand.name} {nail.top.name}
				</span>
			</div>
		</div>
	</div>
);
