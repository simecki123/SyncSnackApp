import { signIn } from "@/app/auth"

export default function SignInPage() {
	return (
		<form
			action={async (formData) => {
				"use server"
				await signIn("credentials", formData)
			}}
		>
			<label>
				Email
				<input name="email" type="email" />
			</label>
			<label>
				Password
				<input name="password" type="password" />
			</label>
			<button>Sign in</button>
		</form>
	)
}
