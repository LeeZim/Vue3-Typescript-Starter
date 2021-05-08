<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <input type="file" name="file" @change.prevent="handleFileChange" accept=".png" />
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

export default defineComponent({
  name: 'Login',
  components: {
    InputValidate,
    ValidForm
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
