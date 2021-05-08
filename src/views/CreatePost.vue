<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader
      :action="'upload'"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <!-- <span class="sr-only">Loading...</span> -->
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" />
      </template>
    </Uploader>
    <ValidForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <InputValidate
          :rule="{ type: 'title' }"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <InputValidate rows="10" tag="textarea" placeholder="请输入文章详情" v-model="contentVal" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </ValidForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from '../utils/axios'
import { GlobalDataProps } from '../store'
import InputValidate from '../components/InputValidate.vue'
import ValidForm from '../components/ValidForm.vue'
import { PostProps } from '../utils/getData'
import Uploader from '../components/Uploader.vue'

export default defineComponent({
  name: 'Login',
  components: {
    InputValidate,
    ValidForm,
    Uploader
  },
  setup() {
    const titleVal = ref('')
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const contentVal = ref('')
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column
          }
          store.commit('createPost', newPost)
          router.push({ name: '/' })
        }
      }
    }
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const { files } = target
      if (files) {
        const uploadedFile = files[0]
        const formData = new FormData()
        formData.append(uploadedFile.name, uploadedFile)
        axios
          .post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then((resp: any) => {
            console.log(resp)
          })
      }
    }
    return {
      titleVal,
      contentVal,
      onFormSubmit,
      handleFileChange
    }
  }
})
</script>
<style lang="stylus">
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}

.create-post-page .file-upload-container img {
  height: 100%;
  width: 100%;
  object-fit: cover
}
</style>
