<template>
  <div class="container">
    <Uploader :action="'upload'" />
    <ColumnList />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import Uploader from '../components/Uploader.vue'

export default defineComponent({
  setup() {},
  components: {
    ColumnList,
    Uploader
  }
})
</script>
