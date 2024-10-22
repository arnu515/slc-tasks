<script lang="ts">
	import { ChevronUp, ChevronDown } from "lucide-svelte";
	import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "./ui/table"
	import {Button} from "./ui/button"
	import {users} from "$lib/data.json"

	export let data: {
	  id: string;
	  date: string;
	  deliverer: string;
	  userId: string;
	  service: string;
	  address: string;
	  picked: boolean;
	}[];
	export let sortColumn: "recipient" | "id" | "date" = "date"
	export let sortDirection: "asc" | "desc" = "desc"
	export let itemsPerPage = 20;
	export let page = 1;

	$: sortedData = data.map(i => ({
	  user: users.find(u => u.id === i.userId),
	  ...i,
	  date: i.date.slice(0, i.date.indexOf('T'))
	}))
	.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
	})

	$: totalPages = Math.ceil(sortedData.length / itemsPerPage)
	$: paginatedData = sortedData.slice((page-1) * itemsPerPage, page*itemsPerPage)

	function handleSort(column: typeof sortColumn) {
	  if (column === sortColumn) sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
	  else {
  	  sortColumn = column
  	  sortDirection = 'asc'
	  }
	}
</script>

<Table>
  <TableHeader>
    <TableRow>
      <TableHead class="w-[50px]">
        Sl. No
      </TableHead>
      <TableHead on:click={() => handleSort("recipient")}>
        Recipient {#if sortColumn === "recipient"}{#if sortDirection === "asc"}<ChevronUp class="inline" />{:else}<ChevronDown class="inline" />{/if}{/if}
      </TableHead>
      <TableHead on:click={() => handleSort("id")}>
        Courier ID {#if sortColumn === "id"}{#if sortDirection === "asc"}<ChevronUp class="inline" />{:else}<ChevronDown class="inline" />{/if}{/if}
      </TableHead>
      <TableHead>Deliverer</TableHead>
      <TableHead>Service</TableHead>
      <TableHead>Room</TableHead>
      <TableHead on:click={() => handleSort("date")}>
        Date Received {#if sortColumn === "date"}{#if sortDirection === "asc"}<ChevronUp class="inline" />{:else}<ChevronDown class="inline" />{/if}{/if}
      </TableHead>
      <TableHead>Taken</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {#each paginatedData as item, i}
      <TableRow>
        <TableCell>{(page-1)*itemsPerPage+i+1}</TableCell>
        <TableCell>{item.user?.name || "Unknown user"}</TableCell>
        <TableCell>{item.id}</TableCell>
        <TableCell>{item.deliverer}</TableCell>
        <TableCell>{item.service}</TableCell>
        <TableCell>{item.address}</TableCell>
        <TableCell>{item.date.toString()}</TableCell>
        <TableCell>
          <span class={item.picked ? "text-green-500" : "text-destructive"}>{item.picked ? "Yes" : "No"}</span>
        </TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>
<div class="mt-4 flex justify-between items-center">
  <div>
    Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, sortedData.length)} of {sortedData.length} entries
  </div>
  <div class="flex space-x-2">
    <Button
      on:click={() => (page = Math.max(page - 1, 1))}
      size="sm"
      disabled={page === 1}
    >
      Previous
    </Button>
    <Button
      on:click={() => (page = Math.min(page + 1, totalPages))}
      size="sm"
      disabled={page === totalPages}
    >
      Next
    </Button>
  </div>
</div>
