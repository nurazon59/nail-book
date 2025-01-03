import type {
	ArtNail,
	BaseCoat,
	Brand,
	ColorNail,
	NailSet,
	Nail as PrismaNail,
	TopCoat,
} from '@prisma/client';

export type Basecoat = BaseCoat & {
	brand: Brand;
};

export type Topcoat = TopCoat & {
	brand: Brand;
};

export type Colornail = ColorNail & {
	brand: Brand;
};

export type Artnail = ArtNail & {
	brand: Brand;
};

export type Nail = PrismaNail & {
	base: Basecoat;
	top: Topcoat;
	color: Colornail;
	art: Artnail;
};

export type Nailset = NailSet & {
	nails: Nail[];
};
