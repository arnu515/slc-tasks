<script lang="ts">
  import {Label} from "$lib/components/ui/label"
  import {Button} from "$lib/components/ui/button"
  import * as Select from "$lib/components/ui/select"
  import data from "$lib/data.json"
	import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "$lib/components/ui/table";

  let sel = null
</script>

<h1 class="text-3xl font-bold my-4">Admin Panel</h1>
<p class="text-lg text-muted-foreground my-4">
  Update delivery status
</p>

<form>
  <Label>Select delivery ID</Label>
  <Select.Root onSelectedChange={({value}) => sel = data.deliveries.find(i => i.id === value) ?? null}>
    <Select.Trigger class="w-[500px]">
      <Select.Value placeholder="Select Delivery" />
    </Select.Trigger>
    <Select.Content>
      {#each data.deliveries as delivery}
        <Select.Item value={delivery.id} label={delivery.id} class="flex items-center gap-2 justify-between">{delivery.id} <span class="text-muted-foreground">{delivery.address}</span></Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>

  {#if sel !== null}
    <p class="my-4">Preview:</p>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Courier ID
          </TableHead>
          <TableHead>Deliverer</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>
            Date Received
          </TableHead>
          <TableHead>Taken</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{sel.id}</TableCell>
          <TableCell>{sel.deliverer}</TableCell>
          <TableCell>{sel.service}</TableCell>
          <TableCell>{sel.address}</TableCell>
          <TableCell>{sel.date.toString()}</TableCell>
          <TableCell on:click={() => sel.picked = !sel.picked} title="Click to toggle" class="cursor-pointer">
            <span class={sel.picked ? "text-green-500" : "text-destructive"}>{sel.picked ? "Yes" : "No"}</span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <Button class="mt-4" on:click={() => {alert("Not implemented!")}}>Save</Button>
  {/if}
</form>
