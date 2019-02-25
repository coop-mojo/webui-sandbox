<template>
  <v-app dark>
    <v-content>
      <HelloWorld/>
      <v-bottom-nav
        absolute
        :active.sync="nav"
        :value="true"
        >
        <v-btn
          flat
          value="item"
          >
          <span>アイテム検索</span>
        </v-btn>
        <v-btn
          flat
          value="binder"
          >
          <span>バインダー</span>
        </v-btn>
        <v-btn
          flat
          value="recipes"
          >
          <span>レシピ一括</span>
        </v-btn>
        <v-btn
          flat
          value="config"
          >
          <span>設定</span>
        </v-btn>
      </v-bottom-nav>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      nav: 'item'
    }
  }
}
</script>
