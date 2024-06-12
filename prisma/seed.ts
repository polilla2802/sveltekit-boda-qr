// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import usersData from "../src/lib/seeders/users.json" assert { type: "json" }

const prisma = new PrismaClient()
// Get the current date
const today = new Date()

async function main() {
	console.log(`Start seeding ...`)

	for (const t of usersData) {
		const user = await prisma.user.create({
			data: {
				id: t.id,
				userName: t.userName,
				name: t.name,
				email: t.email,
				phoneNumber: t.phoneNumber,
				password: t.password,
				gender: t.gender,
				age: t.age,
				createdAt: today,
				updatedAt: today,
			}
		})
		console.log(`Created user with id: ${user.id}`)
	}

	console.log(`Seeding finished.`)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})