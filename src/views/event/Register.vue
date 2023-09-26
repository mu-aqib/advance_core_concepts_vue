<template>
    <p>Register for the event here</p>
    <button @click="register">Register Me</button>
</template>
  
<script setup>
    import { useRouter } from 'vue-router'

    const { event } = defineProps(['event'])
    const router = useRouter()

    const register = () => {
    // Call to API for registration logic
    // If registered successfully, you can redirect to the event details page
    // For example, if registration was successful:
        router.push({
            name: 'event-details',
        })
    }

</script>
  