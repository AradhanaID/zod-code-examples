import { Inter } from 'next/font/google'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import * as zod from "zod"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import wingsLogo from '@/public/wings.svg'
import { zodResolver } from '@hookform/resolvers/zod';
const inter = Inter({ subsets: ['latin'] })

type Inputs = {
	name: string
	email: string
	wantsMonthlyProduct: boolean
	age: number
}

const InputsSchema = zod.object({
	
})

export default function ZodRegular() {
	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
		resolver: zodResolver(InputsSchema)
	})

	const onSubmit = (data: Inputs) => {
		console.log('submitted form');
		console.log(data);
	}

	return (
		<main className={`flex min-h-screen justify-center p-12 ${inter.className}`}>
			<div>
				<Image src={wingsLogo} alt='WINGS' width={128} className="mx-auto" />
				<h1 className='text-2xl my-8 font-semibold'>Developers Registration</h1>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>

					<div className="grid w-full max-w-sm items-center gap-2">
						<Label htmlFor="name">Name</Label>
						<Input type="text" id="name" {...register('name')} />
					</div>

					<div className="grid w-full max-w-sm items-center gap-2">
						<Label htmlFor="email">Email</Label>
						<Input type="email" id="email" placeholder="example@mail.com" {...register('email')} />
					</div>

					<div className="grid w-full max-w-sm items-center gap-2">
						<Label htmlFor="age">Age</Label>
						<Input type="number" id="age" {...register('age')} />
					</div>

					<Button type='submit' className='w-full'>Register</Button>
				</form>
			</div>
		</main>
	)
}
