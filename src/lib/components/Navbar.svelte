<script lang="ts">
export let isAdmin = false;
</script>

<nav class="bg-primary text-primary-foreground p-4">
  <div class="container mx-auto flex justify-between items-center">
    <a href="/" class="text-2xl font-bold">IIIT Courier Portal</a>
    <div class="flex items-center gap-4">
      <a href="/all">All Deliveries</a>
      {#if isAdmin}<a href="/admin">Admin Panel</a>{/if}
      <a href="/logout" class="text-orange-500">Logout</a>
    </div>
  </div>
</nav>
