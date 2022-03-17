<template>
	<header class="messages-header">
		<button
			@click="showMobileMenu">
			<i class="fa-solid fa-bars"></i>
		</button>
		<h1>Messages</h1>
	</header>
</template>
<script>
	export default {
		name: 'Header',
		methods: {
			showMobileMenu () {
				this.$emit('event', 'showMobileMenu');
			}
		}
	}
</script>
<style lang="scss">
	@import './Header.scss';
</style>