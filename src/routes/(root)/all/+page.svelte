<script lang="ts">
	import Deliveries from "$lib/components/Deliveries.svelte"

	export let data;
</script>

<h1 class="text-3xl font-bold my-4">All deliveries</h1>
<p class="text-lg text-muted-foreground my-4">
  There are {data.deliveries.length} deliveries
</p>

<Deliveries data={data.deliveries} />
