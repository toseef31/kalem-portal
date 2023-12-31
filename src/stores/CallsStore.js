import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'
import axiosInstance from '../config.js'
import router from '../router/index.js'

import { useAuthenticationStore } from '../stores/Authentication'
const authenticationStore = useAuthenticationStore()
const { token, flashMessage } = storeToRefs(authenticationStore)

export const useCallsStore = defineStore('calls', () => {
  const calls = ref({})
  const loading = ref(false)
  const pagesSize = ref(0)


  function get_calls({page = 1, limit = 20 , filters = {}} = {}) {
    loading.value = true
    const queryString = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      // trashed: 'only',
      ...filters,
    }).toString();

    axiosInstance
      .get('/api/call?' + queryString , {
        headers: {
          Authorization: 'Bearer ' + token.value
        }
      })
      .then((res) => {
        calls.value = res.data
        pagesSize.value = Array.from({ length: Math.ceil(calls.value.total / calls.value.per_page) }, (_, index) => index + 1)
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 401) {
          authenticationStore.logout
        }
        if (error.response && error.response.status == 404) {
          router.push({
            name: '404Resource',
            params: { resource: 'calls' }
          })
        } else {
          router.push({ name: 'NetworkError' })
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  function deleteCall(callId, page_number) {
    loading.value = true
    axiosInstance
      .delete('/api/call/' + callId ,{
        headers: {
          Authorization: 'Bearer ' + token.value
        }
      })
      .then((res) => {
        get_calls({page: page_number});
        flashMessage.value = 'Record deleted successfully..'

      })
      .catch((error) => {
        console.log(error)
        if (error && error.response && error.response.status === 401) {
          authenticationStore.logout
        }
        if (error.response && error.response.status == 404) {
          router.push({
            name: '404Resource',
            params: { resource: 'calls' }
          })
        } else {
          router.push({ name: 'NetworkError' })
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  return { calls, loading, get_calls, pagesSize, deleteCall }
})
