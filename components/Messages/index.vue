<template>
	<div class="messages">
		<article 
			v-for="message in messages" 
			:key="message.id"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove($event, message.id)"
			:id="message.id">
			<div class="message-content" :id="`message-content-${message.id}`">
				<img v-if="message.author" v-bind:src="authorImageUrl(message.author.photoUrl)" v-bind:alt="message.author.name" />
				<section>
					<header>
						<h2 v-if="message.author">{{ message.author.name }}</h2>
						<p>{{ $moment(message.updated).format('MMM Do, h:mm:ss a') }}</p>
					</header>
					<main>
						{{ message.content | truncate(140) }}
					</main>
				</section>
			</div>
			<div class="item-actions" :id="`message-actions-${message.id}`"></div>
		</article>
	</div>
</template>
<script>
export default {
  name: 'Messages',
  data() {
      return {
		baseUrl: "http://message-list.appspot.com/",
        messages: [],
		pageToken: '',
		count: 10,
		xDown: null,
		yDown: null,
      }
  },
  filters: {
		truncate(string, value) {
			return (string || '').substring(0, value) + '…'
		}
	},
  methods: {
	getTouches(event) {
		return event.touches
	},                                                     
	handleTouchStart(event) {
		const firstTouch = this.getTouches(event)[0];                                      
		this.xDown = firstTouch.clientX;
		this.yDown = firstTouch.clientY;
	},                                                                  
	handleTouchMove(event, messageId) {
		const messageInList = document.getElementById(messageId);
		const messageContent = document.getElementById("message-content-" + messageId);
		const messageActions = document.getElementById("message-actions-" + messageId);

		if ( ! this.xDown || ! this.yDown ) {
			return;
		}

		let xUp = event.touches[0].clientX;                                    
		let yUp = event.touches[0].clientY;

		let xDiff = this.xDown - xUp;
		let yDiff = this.yDown - yUp;
																			
		if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
			if ( xDiff > 0 ) {
				/* right swipe */ 
				console.log("right - xDiff", xDiff);

				messageInList.style.marginLeft = "-" + xDiff;
				messageContent.style.width = (100 - xDiff) + "%";
				messageActions.style.width = xDiff + "%";

				console.log(messageInList);
				if (xDiff > 30) {
					messageActions.style.backgroundColor = '#ff0000';
					messageActions.style.color = '#ffffff';
				} else {
					messageActions.style.backgroundColor = '#bbbbbb';
					messageActions.style.color = '#333333';
				}

			} else {
				/* left swipe */
				console.log("left - xDiff", xDiff);
			}                       
		} else {
			if ( yDiff > 0 ) {
				/* down swipe */ 				
			} else { 
				/* up swipe */
			}                                                                 
		}                                          
	},
	getIntialMessages () {
		this.$axios.$get(this.baseUrl + `messages?limit=${ this.count }`)
			.then(response => {
				this.pageToken = response.pageToken;
				this.messages = response.messages;
			}).catch(error => {
				console.log(error);
			})
	},
	watchForLazyLoading () {
		window.onscroll = () => {
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
