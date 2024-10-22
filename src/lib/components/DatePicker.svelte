<script lang="ts">
  import * as Popover from "./ui/popover"
  import {Button} from "./ui/button"
  import {Calendar} from "./ui/calendar"
  import {cn} from "../utils"
	import { CalendarIcon } from "lucide-svelte";
	import type { DateValue } from "@internationalized/date";

  export let value: DateValue;
  export let name: string | undefined = undefined;
</script>

<Popover.Root>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      class={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
      type="button"
    >
      <CalendarIcon class="mr-2 h-4 w-4" />
      {value ? value.toString() : "Pick a Date"}
    </Button>
  </Popover.Trigger>
  <input type="hidden" {name} {value} />
  <Popover.Content class="w-auto p-0">
    <Calendar
      bind:value
      initialFocus
    />
  </Popover.Content>
</Popover.Root>
