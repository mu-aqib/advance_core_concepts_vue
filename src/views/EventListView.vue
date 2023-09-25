<script setup>
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService.js'

// Import the EventCard component
import EventCard from '@/components/EventCard.vue'

const events = ref(null)

const { page } = defineProps(['page'])

onMounted(() => {
  console.log(page)
  EventService.getEvents(2, page)
    .then((response) => {
      events.value = response.data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <!-- Use the EventCard component -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
