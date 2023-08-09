import { Inter } from 'next/font/google'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import * as zod from "zod"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import wingsLogo from '@/public/wings.svg'
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
const inter = Inter({ subsets: ['latin'] })

// type Inputs = {
// 	name: string
// 	email: string
// 	wantsMonthlyProduct: boolean
// 	age: number
// }

type Inputs = zod.infer<typeof InputsSchema>

const InputsSchema = zod.object({
	name: zod
		.string({
			required_error: "Name must be filled",
			invalid_type_error: "Name must be a string!"
		})
		.min(3, "Name must be at least 3 characters"),
	email: zod
		.string({
			required_error: "Email must be filled",
			invalid_type_error: "Email must be a string!"
		})
		.email("Invalid email address!"),
	age: zod.coerce
		.number({
			required_error: "Age must be filled",
			invalid_type_error: "Age must be a number!"
		})
		.min(18, "You must be more than 18 years old to be a developer"),
	password: zod
		.string({
			required_error: "Password must be filled",
			invalid_type_error: "Password must be a string!"
		})
		.min(8, "Password must be at least 8 characters long"),
	confirmPassword: zod
		.string({
			required_error: "Confirm Password must be filled",
			invalid_type_error: "Confirm Password must be a string!"
		})
		.min(1, "Confirm password must be filled"),
	wantsMonthlyProduct: zod
		.boolean().default(false),
}).refine(({ password, confirmPassword }) => (password === confirmPassword),{
		message: "Password don't match",
		path: ["confirmPassword"]
	})

export default function ZodRegular() {
	const { control, register, handleSubmit, formState: { errors } } = useForm<Inputs>({
		resolver: zodResolver(InputsSchema)
	})

	const onSubmit = (data: Inputs) => {
		console.log('submitted form');
		console.log(data);
	}

	return (
		<main className={`flex min-h-screen justify-center p-12 ${inter.className}`}>
			<div className="w-fit">
				<Image src={wingsLogo} alt='WINGS' width={128} className="mx-auto" />
				<h1 className='my-8 text-2xl font-semibold'>Developers Registration</h1>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4 w-fit'>

					<div className="grid items-center w-full max-w-sm gap-2">
						<Label htmlFor="name">Name</Label>
						<Input type="text" id='name' {...register('name')} />
						{errors.name?.message && <p className='mt-1 text-sm text-red-600'>{errors.name?.message}</p>}
					</div>

					<div className="grid items-center w-full max-w-sm gap-2">
						<Label htmlFor="email">Email</Label>
						<Input type="email" id="email" placeholder="example@mail.com" {...register('email')} />
						{errors.email?.message && <p className='mt-1 text-sm text-red-600'>{errors.email?.message}</p>}
					</div>

					<div className="grid items-center w-full max-w-sm gap-2">
						<Label htmlFor="age">Age</Label>
						<Input type="number" id="age" {...register('age')} defaultValue={0} />
						{errors.age?.message && <p className='mt-1 text-sm text-red-600'>{errors.age?.message}</p>}
					</div>

					<div className="grid items-center w-full max-w-sm gap-2">
						<Label htmlFor="password">Password</Label>
						<Input type="password" id="password" {...register('password')} />
						{errors.password?.message && <p className='mt-1 text-sm text-red-600'>{errors.password?.message}</p>}
					</div>

					<div className="grid items-center w-full max-w-sm gap-2">
						<Label htmlFor="confirmPassword">Confirm Password</Label>
						<Input type="password" id="confirmPassword" {...register('confirmPassword')} />
						{errors.confirmPassword?.message && <p className='mt-1 text-sm text-red-600'>{errors.confirmPassword?.message}</p>}
					</div>

					<div className="w-full">
						<FormField
							control={control}
							name="wantsMonthlyProduct"
							render={({ field }) => (
								<div className='flex space-x-2'>
									<Checkbox id="wantsMonthlyProduct"
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
									<div className="leading-none">
										<label
											className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											I want to receive WINGS&apos; Monthly Product
										</label>
										{errors.wantsMonthlyProduct?.message && <p className='w-full mt-1 text-sm text-red-600'>{errors.wantsMonthlyProduct?.message}</p>}
									</div>
								</div>
							)}
						/>
					</div>

					<Button type='submit' className='w-full max-w-sm'>Register</Button>
				</form>
			</div>
		</main>
	)
}
