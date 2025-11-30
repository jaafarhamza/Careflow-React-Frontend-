import RegisterForm from '@/components/organisms/RegisterForm'

export const Register = () => {
  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>
      </div>
      <RegisterForm />
    </div>
  )
}
