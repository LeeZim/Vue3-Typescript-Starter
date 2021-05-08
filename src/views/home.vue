<template>
  <div class="container">
    <Uploader
      :action="'upload'"
      :beforeUpload="checkFileIsJPG"
      @file-uploaded="fileUploaded"
      @file-uploaded-error="fileUploadedError"
    />
    <ColumnList />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList from '../components/ColumnList.vue'
import Uploader, { CheckFunction } from '../components/Uploader.vue'
import createMessage from '../utils/createMessage'

export default defineComponent({
  setup() {
    const checkFileIsJPG: CheckFunction = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('图片格式不是JPG', 'error', 1500)
      }
      return isJPG
    }
    const fileUploaded = (data: any) => {
      // eslint-disable-next-line no-underscore-dangle
      createMessage(`图片上传成功ID:${data.data._id}`, 'success', 1500)
    }
    const fileUploadedError = (error: any) => {
      createMessage(`${error}`, 'error', 1500)
    }
    return {
      checkFileIsJPG,
      fileUploaded,
      fileUploadedError
    }
  },
  components: {
    ColumnList,
    Uploader
  }
})
</script>
