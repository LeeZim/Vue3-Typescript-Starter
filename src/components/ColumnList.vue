<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-start">{{ column.description }}</p>
          <router-link :to="`/detail/${column.id}`" class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'

export default defineComponent({
  name: 'ColumnList',
  setup() {
    const store = useStore<GlobalDataProps>()
    const list = store.state.columns
    const columnList = computed(() => {
      return list.map((column) => {
        if (!column.avatar) {
          // column.avantar = require('@/assets/defaultIcon.jpg')
          column.avatar = '/src/assets/defaultIcon.jpg'
        }
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style scoped></style>
