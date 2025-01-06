import 'next-auth';
import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: DefaultUser & {
			uid: string;
		};
	}

	interface User {
		uid: string;
	}
}
