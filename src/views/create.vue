<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <InputValidate
          :rule="{ rule: 'title' }"
          v-model="titleVal"
          placeholder="请输入文章标题"
          type="title"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <InputValidate
          :rule="{ rule: 'content' }"
          type="content"
          rows="10"
          placeholder="请输入文章详情"
          v-model="contentVal"
          tag="textarea"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">创建</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import InputValidate from '../components/InputValidate.vue'
import ValidateForm from '../components/ValidForm.vue'
import { PostProps } from '../utils/testData'

export default defineComponent({
  name: 'Login',
  components: {
    InputValidate,
    ValidateForm
  },
  setup() {
    const titleVal = ref('')
    const router = useRouter()
    const store = useStore()
    const contentVal = ref('')
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const columnId = store.state.user.id
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
        }
        router.push('/')
      }
    }

    return {
      titleVal,
      contentVal,
      onFormSubmit
    }
  }
})
</script>
