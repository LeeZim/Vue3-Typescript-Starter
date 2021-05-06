<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar.url"
            :alt="column.title"
            class="rounded-circle border border-light my-3"
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
import { computed, defineComponent, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'
import { ColumnProps } from '../utils/getData'

export default defineComponent({
  name: 'ColumnList',
  setup() {
    const store = useStore<GlobalDataProps>()
    const list = computed<ColumnProps[]>(() => store.state.columns)
    const columnList = computed<ColumnProps[]>(() => {
      return list.value.map((column: ColumnProps) => {
        if (column.avatar && !column.avatar.url) {
          // column.avantar = require('@/assets/defaultIcon.jpg')
          column.avatar.url = '/src/assets/defaultIcon.jpg'
        } else if (column.avatar) {
          column.avatar.url = `${column.avatar.url}?x-oss-process=image/resize,m_pad,h_50,w_50`
        }
        return column
      })
    })
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    onUpdated(() => {})
    return {
      columnList
    }
  }
})
</script>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
