<script lang="ts">
  import data from "$lib/data.json"
	import Deliveries from "$lib/components/Deliveries.svelte";

  const myDeliveries = data.deliveries.filter(x => x.userId === data.currentUserId)
  const numPending = myDeliveries.filter(x => !x.picked).length
</script>

<h1 class="text-3xl font-bold my-4">Your deliveries</h1>
<p class="text-lg text-muted-foreground my-4">
  You have {numPending} pending {numPending === 1 ? "delivery" : "delivieries"}
</p>

<Deliveries data={myDeliveries} />
