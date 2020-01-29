<template>
  <div class="app-view">
    <box-header />
    <router-view />
    <global-view />
  </div>
</template>

<script>
import header from '@views/Parts/Header'
import GlobalView from '@views/Parts/GlobalView'
export default {
  name: 'Main',
  asyncData({ store, route, accessToken = '' }) {
    // 触发 action 后，会返回 Promise
    return Promise.all([
      store.dispatch('PERSONAL_INFO', { accessToken }),
      store.dispatch('website/GET_WEBSITE_INFO'),
      store.dispatch('articleTag/GET_ARTICLE_TAG_ALL')
    ])
  },
  mounted() {
    // 获取未读消息, 获取文章、片刻关联信息
    this.$store.dispatch('user/GET_UNREAD_MESSAGE_COUNT')
    this.$store.dispatch('user/GET_ASSOCIATE_INFO')
  },
  components: {
    'box-header': header,
    GlobalView
  }
}
</script>
