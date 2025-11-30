import LoginForm from '@/components/organisms/LoginForm'

export const Login = () => {
  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sign in
        </h1>
      </div>
      <LoginForm />
    </div>
  )
}
