<template>
  <v-app id="app" fixed-footer fill-height :dark="useDarkTheme">
    <main>
      <v-tabs v-model="active">
        <v-tabs-bar>
          <v-tabs-slider :color="linkColor">
          </v-tabs-slider>
          <v-tabs-item href="#item-tab">
            アイテム検索
          </v-tabs-item>
          <v-tabs-item href="#binder-tab">
            バインダー
          </v-tabs-item>
          <v-tabs-item href="#recipe-menu-tab">
            レシピ一括(仮)
          </v-tabs-item>
          <v-tabs-item href="#item-detail-tab" class="hidden-sm-and-up" v-if="item.アイテム名 != ''">
            アイテム
          </v-tabs-item>
          <v-tabs-item href="#recipe-detail-tab" class="hidden-sm-and-up" v-if="recipe.レシピ名 != ''">
            レシピ
          </v-tabs-item>
          <v-tabs-item href="#config-tab">
            設定
          </v-tabs-item>
        </v-tabs-bar>
        <v-container fluid class="pl-2 pr-2 pt-0 pb-0">
          <v-layout>
            <v-flex md8>
              <v-layout row wrap v-if="useCharacterInfo && (active == 'item-tab' || active == 'binder-tab')">
                <v-flex xs8 md4>
                  <v-select label="キャラクター" v-model="sCharacter" :items="characters" item-text="name">
                  </v-select>
                </v-flex>
              </v-layout>

              <v-tabs-items>
                <v-tabs-content id="item-tab">
                  <item-tab :character="sCharacter">
                  </item-tab>
                </v-tabs-content>
                <v-tabs-content id="binder-tab">
                  <recipe-tab title="バインダー" :categories="binders" :character="sCharacter">
                  </recipe-tab>
                </v-tabs-content>
                <v-tabs-content id="recipe-menu-tab">
                  <recipe-menu-tab :character="sCharacter">
                  </recipe-menu-tab>
                </v-tabs-content>
                <v-tabs-content lazy id="item-detail-tab">
                  <router-view name="item"></router-view>
                </v-tabs-content>
                <v-tabs-content lazy id="recipe-detail-tab">
                  <router-view name="recipe"></router-view>
                </v-tabs-content>
                <v-tabs-content id="config-tab">
                  <config-tab>
                  </config-tab>
                </v-tabs-content>
              </v-tabs-items>
            </v-flex>
            <v-flex sm6 md5 lg4 class="hidden-xs-only">
              <router-view name="item" v-if="item.アイテム名 != ''"></router-view>
              <router-view name="recipe" v-if="recipe.レシピ名 != ''"></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tabs>
    </main>
    <v-footer app>
      <img :src="logo" width="16" class="mr-1">
      生協の知恵袋
      <v-spacer></v-spacer>
      <a href="http://docs.fukuro.coop.moe/" class="mr-1">
        <v-icon>fa-question-circle</v-icon>
      </a>
      <a href="https://twitter.com/coop_moe" class="mr-1">
        <v-icon>fa-twitter</v-icon>
      </a>
      <a href="https://github.com/coop-mojo/moecoop-webui">
        <v-icon>fa-github</v-icon>
      </a>
    </v-footer>
  </v-app>
</template>

<script>
import RecipeTab from './RecipeTab.vue'
import ItemTab from './ItemTab.vue'
import RecipeMenuTab from './RecipeMenuTab.vue'
import ConfigTab from './ConfigTab.vue'
import logo from './assets/moecoop.svg'
import { baseURL, getCall } from './rest'

export default {
  name: 'app',
  data() {
    return {
      binders: [],
      skills: [],
      sCharacter: { name: '' },
      logo: logo,
      adMessage: "ダイアロス生活協同組合は P 鯖と E 鯖で活動中！晩御飯からピッキングの相談までお気軽にどうぞ！",
    }
  },
  computed: {
    useDarkTheme() {
      return this.$store.state.useDarkTheme
    },
    useCharacterInfo() {
      return this.$store.state.useCharacterInfo
    },
    characters() {
      return this.$store.state.characters
    },
    item() {
      return this.$store.state.item
    },
    recipe() {
      return this.$store.state.recipe
    },
    active: {
      get: function() {
        return this.$store.state.tab
      },
      set: function(newTab) {
        this.$store.commit('gotoTab', newTab)
      }
    },
    linkColor() {
      return this.$store.state.linkColor
    },
  },
  mounted: function() {
    this.sCharacter = this.characters[0]
    getCall(baseURL+"/information", (xhr) => {
      if (xhr.readyState==4 && xhr.status==200) {
        const msg = JSON.parse(xhr.response)["message"]
        if (msg.length > 0) {
          this.adMessage = msg
        }
      }
    })
    getCall(baseURL+'/binders', (xhr) => {
      if (xhr.readyState==4 && xhr.status==200) {
        const result = JSON.parse(xhr.response)
        this.binders = [{text: '全てのバインダー', value: '/recipes'}].concat(
          result['バインダー一覧'].map(b => ({ text: b.バインダー名, value: b.レシピ一覧 }))
        )
      }
    })
  },
  methods: {
    deleteCharacter: function(char) {
      const s = this.sCharacter
      this.$store.commit('deleteCharacter', char)
      if (s.text == char) {
        this.sCharacter = this.characters[0]
      }
    },
  },
  components: {
    ItemTab,
    RecipeTab,
    RecipeMenuTab,
    ConfigTab,
  }
}

</script>

<style>

  /* Note: scoped に入れるとうまくいかない */
  div.input-group__details {
    min-height: 0px;
  }

</style>
