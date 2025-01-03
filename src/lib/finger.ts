export function fingerToNumber(finger: string): number {
	switch (finger) {
		case 'Thumb':
		case '親指':
			return 0;
		case 'Index':
		case '人差し指':
			return 1;
		case 'Middle':
		case '中指':
			return 2;
		case 'Ring':
		case '薬指':
			return 3;
		case 'Pinky':
		case '小指':
			return 4;
		default:
			return -1;
	}
}

export function numberToFinger(number: number): string {
	switch (number) {
		case 0:
			return '親指';
		case 1:
			return '人差し指';
		case 2:
			return '中指';
		case 3:
			return '薬指';
		case 4:
			return '小指';
		default:
			return '';
	}
}
