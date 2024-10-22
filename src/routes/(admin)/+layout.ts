import {error} from "@sveltejs/kit"
import type {PageLoad} from "./$types"
import data from "$lib/data.json"

export const load: PageLoad = () => {
  if (!data.users.find(u => u.id === data.currentUserId)?.isAdmin) error(404, "Not found")
}
