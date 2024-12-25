"use client";

import { signIn } from "next-auth/react";
function signInPage() {
	return (
		<div>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button onClick={() => signIn("google")}>Sign in with Google</button>
		</div>
	);
}

export default signInPage;
