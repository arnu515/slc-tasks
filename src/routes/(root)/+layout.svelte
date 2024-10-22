<script>
	import * as Card from "$lib/components/ui/card"
	import {Badge} from "$lib/components/ui/badge"
	import {Button} from "$lib/components/ui/button"
	import {Input} from "$lib/components/ui/input"
	import {Label} from "$lib/components/ui/label"
	import Navbar from "$lib/components/Navbar.svelte"
	import data from "$lib/data.json"
	import DatePicker from "$lib/components/DatePicker.svelte";
	import { today } from "@internationalized/date";

	const user = data.users.find(x => x.id == data.currentUserId)
	let from = today(), to = today()
</script>

<Navbar isAdmin={user.isAdmin} />

<div class="container mx-auto my-4 flex flex-col-reverse lg:grid lg:grid-cols-[3fr_1fr] gap-4">
	<main class="p-4">
		<slot />
	</main>
	<aside class="p-4">
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center justify-between">Your Profile {#if user.isAdmin}<Badge>Admin</Badge>{/if}</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="grid grid-cols-[1fr_2fr] gap-y-2">
					<span class="font-medium">Name:</span>
					<span>{user.name}</span>
					<span class="font-medium">Email:</span>
					<span>{user.email}</span>
					{#if user.isAdmin}<span class="text-destructive col-span-2">You're an admin</span>{/if}
				</div>
			</Card.Content>
			<Card.Footer class="flex justify-end items-center">
				<Button variant="destructive" size="sm">Logout</Button>
			</Card.Footer>
		</Card.Root>
		<Card.Root class="mt-4">
			<Card.Header>
				<Card.Title>Search</Card.Title>
			</Card.Header>
				<form class="flex justify-center flex-col gap-2" action="/all" method="GET">
			<Card.Content>
					<Label for="name">Recipient Name:</Label>
					<Input type="text" id="name" name="name" placeholder="Enter name" class="w-full" />
					<Label>From Date:</Label>
					<DatePicker name="from" value={from} />
					<Label>To Date:</Label>
					<DatePicker name="to" value={to} />
					<p class="text-xs text-muted-foreground pt-2">Date based filtering has not been implemented yet.</p>
			</Card.Content>
			<Card.Footer class="flex justify-end items-center">
				<Button type="submit" size="sm">Search</Button>
			</Card.Footer>
				</form>
		</Card.Root>
	</aside>
</div>
