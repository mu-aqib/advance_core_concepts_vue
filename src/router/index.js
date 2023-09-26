import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
// import EventDetailsView from '../views/EventDetailsView.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue';
import NetworkError from '../views/NetworkError.vue';

import EventLayout from "../views/event/Layout.vue"
import EventDetails from "../views/event/Details.vue"
import EventRegister from "../views/event/Register.vue"
import EventEdit from "../views/event/Edit.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
    },
    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayout,
      props: true,
      children: [
        {
          path: '',
          name: 'event-details',
          component: EventDetails
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkError
    }
  ],
})

export default router
