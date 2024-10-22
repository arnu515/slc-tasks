import type {PageLoad} from "./$types"
import data from "$lib/data.json"

export const load: PageLoad = ({url: {searchParams}}) => {
  const name = searchParams.get("name")
  if (typeof name === 'string' && !!name.trim()) {
    const recpIds = data.users.filter(v => v.name.includes(name)).map(v => v.id)
    return {deliveries: data.deliveries.filter(i => recpIds.includes(i.userId)), isSearch: true}
  }
  return {deliveries: data.deliveries, isSearch: false}
}
