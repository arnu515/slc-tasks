<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte"
  import data from "$lib/data.json"

  const user = data.users.find(d => d.id === data.currentUserId)
</script>

<Navbar isAdmin={user.isAdmin} />
<div class="container mx-auto my-4">
  <slot />
</div>
