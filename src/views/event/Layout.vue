<template>
    <div v-if="event">
      <h1>{{ event.title }}</h1>
      <div id="nav">
        <router-link :to="{ name: 'event-details' }">Details</router-link>
        |
        <router-link :to="{ name: 'event-register' }">Register</router-link>
        |
        <router-link :to="{ name: 'event-edit' }">Edit</router-link>
      </div>
      <router-view :event="event" />
    </div>
  </template>
  
<script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import EventService from '@/services/EventService.js'
  
  const props = defineProps({
    id: {
      required: true,
    },
  })
  const router = useRouter()
  const event = ref(null)
  
  const fetchEvent = () => {
    EventService.getEvent(props.id)
      .then((response) => {
        event.value = response.data
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          router.push({
            name: '404-resource',
            params: { resource: 'event' }
          })
        } else {
          router.push({ name: 'network-error' })
        }
      })
  }
  
  onMounted(() => {
    fetchEvent()
  })
</script>
  