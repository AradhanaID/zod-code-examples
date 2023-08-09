import * as zod from 'zod';

// type Inputs = {
// 	name: string;
// 	email: string;
// 	age: number;
// 	password: string;
// 	confirmPassword: string;
// 	wantsMonthlyProduct: boolean;
// }

type Inputs = zod.infer<typeof InputsSchema>

const InputsSchema = zod.object({
	name: zod
		.string()
		.min(3, "Name must be at least 3 characters"),
	email: zod
		.string()
		.email("Invalid email address!"),
	age: zod.coerce
		.number()
		.min(18, "You must be more than 18 years old to be a developer"),
	password: zod
		.string()
		.min(8),
	confirmPassword: zod
		.string()
		.min(1),
	wantsMonthlyProduct: zod
		.boolean()
		.default(false),
}).refine(({ password, confirmPassword }) => (password === confirmPassword),{
		message: "Password don't match",
		path: ["confirmPassword"]
	})

	