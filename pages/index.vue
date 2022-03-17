<template>
	<div class="container">
		<Menu v-show="showMobileMenu" />
		<Header @showMobileMenu="showMobileMenu = true"  />
		<Messages/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'IndexPage',
	data () {
		return {
			showMobileMenu: false
		}
	}
})
</script>
