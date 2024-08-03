import { signIn } from "@/app/auth"

export default function SignIn() {
  return (
    <form
      action={async (formData: any) => {
        "use server"
        await signIn("credentials", {
          email: formData.get('email'),
          password: formData.get('password'),
          redirect: true,
          callbackUrl: '/home'
        })
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
      <button>Sign In</button>
    </form>
  )
}
