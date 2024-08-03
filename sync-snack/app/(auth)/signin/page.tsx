import { signIn } from "@/app/auth"

export default function SignIn() {
  return (
    <form
      action={async (formData: any) => {
        "use server"
        console.log(formData)
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirectTo: '/home'
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
