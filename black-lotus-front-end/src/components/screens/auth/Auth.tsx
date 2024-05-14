import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { IEmailPassword } from '@/services/store/user/user.interface'
import Heading from 'components/ui/Heading'
import Loader from 'components/ui/Loader'
import Meta from 'components/ui/Meta' // Importing Meta correctly
import Button from 'components/ui/button/Button'
import Field from 'components/ui/input/Field'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuthRedirect } from './useAuthRedirect'
import { validEmail } from './valid-email'

const Auth: FC = () => {
	useAuthRedirect()
	const { isLoading } = useAuth()
	const { login, register } = useActions()
	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IEmailPassword> = (data: IEmailPassword) => {
		if (type === 'login') login(data)
		else register(data)
		reset()
	}
	return (
		<Meta title='Auth'>
			<section className='flex h-screen'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='rounded-lg bg-white shadow-sm p-8 m-auto'
				>
					<Heading className='capitalize text-center mb-4'>
						{type}
					</Heading>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<Field
								{...formRegister('email', {
									required: 'Email is required',
									pattern: {
										value: validEmail,
										message: 'Please enter a valid Email'
									}
								})}
								placeholder='Email'
								error={errors.email?.message}
							/>
							<Field
								{...formRegister('password', {
									required: 'Password is required',
									minLength: {
										value: 8,
										message:
											'Min length should more 8 symbols'
									}
								})}
								type='password'
								placeholder='Password'
								error={errors.password?.message}
							/>{' '}
							<div className='flex justify-center items-center'>
								<Button type='submit' variant='dark'>
									Let's go!
								</Button>
							</div>
							{''}
							<div className='flex justify-center items-center'>
								<button
									type='button'
									className='inline-block opacity-20 mt-3'
									onClick={() =>
										setType(
											type === 'login'
												? 'register'
												: 'login'
										)
									}
								>
									{type === 'login' ? 'Register' : 'Login'}
								</button>
							</div>
						</>
					)}
				</form>
			</section>
		</Meta>
	)
}

export default Auth
