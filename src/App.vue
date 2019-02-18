<template>
  <v-app dark>
    <v-system-bar status>
        <v-img
          :src="require('./assets/logo.svg')"
          class="my-3"
          contain
          height="18"
        ></v-img>
        <span>生協の知恵袋 (冗長なので削除)</span>
        <v-spacer></v-spacer>
    </v-system-bar>

    <v-content fluid>
      <HelloWorld/>
    <v-bottom-nav absolute>
     <v-btn
        flat
        value="recent"
      >
        <span>アイテム検索</span>
     </v-btn>
     <v-btn
        flat
        value="recent"
      >
        <span>バインダー</span>
     </v-btn>
     <v-btn
        flat
        value="recent"
      >
        <span>レシピ一括</span>
     </v-btn>
     <v-btn
        flat
        value="recent"
      >
        <span>設定</span>
     </v-btn>
    </v-bottom-nav>
    </v-content>

  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
