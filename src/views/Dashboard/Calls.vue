<template>
  <div class="px-4 sm:px-6 lg:px-8 overflow-auto">
    <div class="flex flex-wrap mt-1 items-center justify-between mb-4">
      <div class="flex-row hidden md:block">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Recent Calls</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the calls in your account.</p>
      </div>
      <div class="flex-wrap flex-row md:flex gap-2">
        <div class=" flex-row md:flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">From</label>
          <input v-model="searchFilters.from" type="text" placeholder="Enter 'From' number" class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2 w-full" />
        </div>
        <div class=" flex-row md:flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">To</label>
          <input v-model="searchFilters.to" type="text" placeholder="Enter 'To' number" class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2 w-full" />
        </div>
        <div class=" flex-row md:flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Call ID</label>
          <input v-model="searchFilters.call_id" type="text" placeholder="Enter Call ID" class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2 w-full" />
        </div>
        <div class=" flex-row md:flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input v-model="searchFilters.date_from" type="date"  class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2 w-full" />
        </div>
        <div class=" flex-row md:flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input v-model="searchFilters.date_to" type="date"  class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2 w-full" />
        </div>
        <div class=" flex-row md:flex-col">
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <button @click="handleSearch" type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <MagnifyingGlassIcon class="w-5 h-5 ml-2 mr-2" />
          </button>
        </div>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                >
                  Call ID
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                >
                  Application
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                >
                  from
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  to
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  answer_at
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  hangup_at
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  duration
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  cost
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  status
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                >
                  <span class="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(call, index) in calls.data" :key="call.call_id">
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                  ]"
                >
                  {{ call.call_id }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.application_id }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.from }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.to }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.answer_at }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.hangup_at }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.duration }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.cost }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                  ]"
                >
                  {{ call.status }}
                </td>
                <td
                  :class="[
                    index !== calls.data.length - 1 ? 'border-b border-gray-200' : '',
                    'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                  ]"
                >
                <TrashIcon class="text-red-500 w-5 hover:cursor-pointer hover:text-red-900"
                  @click="openModel(call.call_id)"
                 />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div>
      <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div class="mt-px flex w-0 flex-1">
          <a
            v-if="calls.current_page != 1"
            @click="callsStore.get_calls({page:calls.current_page - 1})"
            href="#"
            class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon class="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Previous
          </a>
        </div>
        <div class="hidden md:-mt-px md:flex" v-if="calls.data && calls.data.length">
          <a v-for="(currentPage) in paginatedPages" :key="currentPage" @click="callsStore.get_calls({page:currentPage})" href="#"
            :class="[
                    calls.current_page === currentPage
                      ? 'inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600'
                      : 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    ]"
          >{{ currentPage }}</a>
        </div>
        <div class="-mt-px flex w-0 flex-1 justify-end">
          <a
            v-if="calls.current_page < pagesSize.length"
            @click="callsStore.get_calls({page:calls.current_page + 1})"
            href="#"
            class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon class="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </div>
  </div>
  <ModelVue ref="modalComponent" @is-delete-confirmed="callsStore.deleteCall(userId, calls.current_page)"/>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted,computed, ref } from 'vue'
import { useCallsStore } from '../../stores/CallsStore'
const callsStore = useCallsStore()
const { loading, calls, pagesSize } = storeToRefs(callsStore)
import { ArrowLongLeftIcon, ArrowLongRightIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/vue/20/solid'
import ModelVue from '../../components/Model.vue'


//Refs

const maxVisiblePages = ref(6); // Maximum number of pages to display before showing the ellipsis
const searchFilters = ref({
  from: '',
  to: '',
  call_id: '',
  date_from: '',
  date_to: '',
  // Add more filter properties as needed
});
const userId = ref(null);
const modalComponent = ref(null); // Create a ref to store the child component reference




//Computed reactive properties
const paginatedPages = computed(() => {
  const totalPages = pagesSize.value.length; // Use the length of the pagesSize array

  if (totalPages <= maxVisiblePages.value || totalPages <= 10) {
    return pagesSize.value; // Return the pagesSize array as-is
  } else {
    const firstPages = callsStore.pagesSize.slice(0, maxVisiblePages.value);  //pages to show before showing the ellipsis   - default 6 pages -
    const lastPages = callsStore.pagesSize.slice(totalPages - 3); //pages to show after showing the ellipsis -default last 3 pages

    return [...firstPages, '...', ...lastPages]; // adding the ellipsis if pages are more than 10
  }
});

// Hooks
onMounted(() => {
  callsStore.get_calls()
  // v-for="(page, index) in Math.ceil(calls.total / calls.per_page)"
})

//Methods
const handleSearch = () => {
  callsStore.get_calls({filters:searchFilters.value});
}

const openModel = (call_id)=>{
  modalComponent.value.showModel();
  userId.value = call_id;
}

</script>
