<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import EventService from '@/services/EventService.js'

// Import the EventCard component
import EventCard from '@/components/EventCard.vue'

const events = ref(null)
const totalPages = ref(null)

const { page } = defineProps(['page'])

function getEventsList() {
  EventService.getEvents(2, page)
    .then((response) => {
      events.value = null
      events.value = response.data
      totalPages.value = response.headers['x-total-count']
    })
    .catch((error) => {
      console.log(error)
    })
}

// ---------------  ONMOUNTED HOOK  ----------------------- //
onMounted(() => {
  getEventsList()
})

watch(page, () => {
  getEventsList()
})

// -----------------  COMPUTED PROPERTIES   ----------------------//
const hasNextPage = computed( () => {
  const pageNo = Math.ceil(totalPages.value / 2)
  console.log(pageNo)
  return page < pageNo;
})


// ---------  WATCH EFFECTS   ---------------- //
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <!-- Use the EventCard component -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page > 1"
        >&#60; Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next {{ hasNextPage }} &#62;</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
