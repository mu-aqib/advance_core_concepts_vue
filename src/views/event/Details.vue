<template>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
</template>
  
<script setup>
  import { onMounted } from 'vue'
  const {event} = defineProps(["event"])
</script>