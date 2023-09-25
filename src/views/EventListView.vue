<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService.js'
import EventCard from '@/components/EventCard.vue'
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';

const events = ref(null)
const totalPages = ref(null)

// const { page } = defineProps(['page'])
const route = useRoute();


// -- COMPUTED PROPERTIES
const page = computed( () => parseInt(route.query.page) || 1 )
const hasNextPage = computed(() => {
  const pageNo = Math.ceil(totalPages.value / 2)
  console.log(pageNo, "sdjfhsjk", page.value);
  return  page.value < pageNo
})

onMounted(() => {
  // getEventsList()
  watchEffect( () => {
    EventService.getEvents(2, page.value)
      .then((response) => {
        events.value = null
        events.value = response.data
        totalPages.value = parseInt(response.headers['x-total-count'])
      })
      .catch((error) => {
        console.log(error)
      })
  })
})

</script>

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <!-- Use the EventCard component -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <RouterLink 
        id="page-prev"
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page > 1"
      >
        &#60; Previous
      </RouterLink> 

      <RouterLink
        id="page-next"
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next  &#62;</RouterLink
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
