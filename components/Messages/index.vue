<template>
	<div class="messages">
		<swipe-list
			v-if="dataReady"
			ref="list"
			class="card"
			:disabled="!enabled"
			:items="messages"
			item-key="id"
			@swipeout:click="itemClick"
		>
			<template v-slot="{ item, index, revealLeft, revealRight, close }">
				<div class="card-content">
					<img class="author-image" v-if="item.author" v-bind:src="authorImageUrl(item.author.photoUrl)" v-bind:alt="item.author.name" />
					<section>
						<header>
							<h2 v-if="item.author">{{ item.author.name }}</h2>
							<p>{{ $moment(item.updated).format('MMM Do, h:mm:ss a') }}</p>
						</header>
						<main>
							{{ item.content | truncate(140) }}
						</main>
					</section>
				</div>
			</template>
			<template v-slot:left="{ item, close }">
				<div class="swipeout-action red" title="remove" @click="remove(item)">
					<i class="fa fa-trash"></i>
				</div>
				<div class="swipeout-action purple" @click="close">
					<i class="fa fa-close"></i>
				</div>
			</template>
			<template v-slot:right="{ item }">
				<div class="swipeout-action green">
					<i class="fa fa-heart"></i>
				</div>
			</template>
			<template v-slot:empty>
				<div>
					<!-- change mockSwipeList to an empty array to see this slot in action  -->
					list is empty ( filtered or just empty )
				</div>
			</template>
		</swipe-list>

		<div v-else class="loading">
			<i class="fa-solid fa-spinner fa-pulse"></i>
			<p>Loading messages...</p>
		</div>

		<button 
			type="button" 
			class="item-removed" 
			v-if="itemRemoved">
			<span>Message was deleted</span>
			<span class="button-label">Undo</span>
		</button>
	</div>
</template>
<script>

import { SwipeList, SwipeOut } from 'vue-swipe-actions';
import 'vue-swipe-actions/dist/vue-swipe-actions.css';

export default {
  name: 'Messages',
	components: {
    SwipeOut,
    SwipeList
  },
  data() {
      return {
				baseUrl: "http://message-list.appspot.com/",
				dataReady: false,
				messages: [],
				pageToken: '',
				count: 10,
				xDown: null,
				yDown: null,
				enabled: true,
				itemRemoved: false,
      }
  },
  filters: {
		truncate(string, value) {
			return (string || '').substring(0, value) + '…'
		}
	},
  methods: {
		remove(item) {
			this.messages = this.messages.filter(i => i !== item);
			
			setTimeout(() => {
				this.itemRemoved = true;
				setTimeout(() => {
					this.itemRemoved = false;
				}, 5000);
			}, 250);

		},
		itemClick(e) {
			console.log(e, "item click");
		},
		getIntialMessages () {

			setTimeout(() => {
				this.$axios.$get(this.baseUrl + `messages?limit=${ this.count }`)
					.then(response => {
						this.pageToken = response.pageToken;
						this.messages = response.messages;
						this.dataReady = true;
					}).catch(error => {
						console.log(error);
					})
			}, 3000);
		},
		watchForLazyLoading () {
		const body = document.body;
		const scrollUp = "scroll-up";
		const scrollDown = "scroll-down";
		let lastScroll = 0;

		window.onscroll = () => {
			const currentScroll = window.pageYOffset;
			if (currentScroll <= 0) {
				body.classList.remove(scrollUp);
				return;
			}
		
			if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
				// down
				body.classList.remove(scrollUp);
				body.classList.add(scrollDown);
			} else if (
				currentScroll < lastScroll &&
				body.classList.contains(scrollDown)
			) {
				// up
				body.classList.remove(scrollDown);
				body.classList.add(scrollUp);
			}
			lastScroll = currentScroll;

			// Infinite Scrolling
			let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight + 2 >= document.documentElement.offsetHeight
			if (bottomOfWindow) {
				console.log("bottom of window", bottomOfWindow);
				this.$axios.$get(this.baseUrl + `messages?limit=${ this.count }&pageToken=${this.pageToken}`)
					.then(response => {
						const newMessages = response.messages;
						newMessages.forEach(message => {
							this.messages.push(message)
						})
						this.pageToken = response.pageToken;
					});
			}

      	};
    },
    authorImageUrl: function (authorPhotoUrl) {
      const url = this.baseUrl + authorPhotoUrl;
	  console.log(url);
	  return url;
    }
  },
  beforeMount() {
    this.getIntialMessages();
  },
  mounted() {
    this.watchForLazyLoading();
  }
}
</script>
<style lang="scss">
	@import './Messages.scss';
</style>
