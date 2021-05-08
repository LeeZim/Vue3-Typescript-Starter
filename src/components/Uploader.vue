<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="trigerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change.prevent="handleFileChange"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import axios from '../utils/axios'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
// eslint-disable-next-line no-unused-vars
export type CheckFunction = (file: File) => boolean
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  inheritAttrs: false,
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()
    const trigerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        axios
          .post(props.action, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((resp) => {
            fileStatus.value = 'success'
            uploadedData.value = resp.data
            context.emit('file-uploaded', resp.data)
          })
          .catch(() => {
            // context.emit('file-uploaded-error', { error })
            // fileStatus.value = 'error'
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = ''
            }
          })
      }
    }
    return {
      fileInput,
      trigerUpload,
      fileStatus,
      handleFileChange,
      uploadedData
    }
  }
})
</script>
