<script setup>
import { ref } from 'vue';
const input = ref('');
const time = ref(0);
const result = ref('');
const chatsList = ref([]);
const type = ref('user');

function search() {
	result.value = '思考中...';
	setTimeout(() => {
		type.value = type.value === 'ai' ? 'user' : 'ai';
		chatsList.value.push({
			name: 'stuid',
			type: type.value,
			content: '啊，你是个大聪明！！',
		});
		result.value = '啊，你是个大聪明！！';
	}, 0);
}

function clear() {
	result.value = '';
}
</script>

<template>
	<main>
		<div class="search-bar">
			<el-input v-model="input" />
		</div>
		<div class="tool-bar">
			<span style="margin-right: 15px">思考耗时：{{ time }} s</span>
			<el-button @click="clear">clear</el-button>
			<el-button @click="search" type="primary">search</el-button>
		</div>
		<div class="chat-box">
			<div
				v-for="(speaker, index) in chatsList"
				:key="index"
				class="item"
				:class="{
					'is-ai': speaker.type === 'ai',
					'is-user': speaker.type === 'user',
				}"
			>
				<div class="ai-name" v-if="speaker.type === 'ai'">
					{{ speaker.name }}
				</div>
				<div class="word-block">
					{{ speaker.content }}
				</div>
			</div>
			<!-- {{ result }} -->
		</div>
	</main>
</template>
<style scoped lang="scss">
.tool-bar {
	display: flex;
	justify-content: right;
	margin-top: 15px;
}
.chat-box {
	display: flex;
	flex-direction: column;
	align-items: end;
	.item {
    width: 100%;
    margin-bottom: 15px;
		.ai-name {
      font-size: 16px;
      margin-bottom: 5px;
		}
    .word-block {
      max-width: 80%;
      padding: 5px;
      border-radius: 10px;
    }
		&.is-ai {
      text-align: left;
			align-self: start;
			.word-block {
				box-shadow: 0 0 3px 3px #cdcdcd;
			}
		}
		&.is-user {
      text-align: right;
			.word-block {
        float: right;
        text-align: right;
				background: var(--el-color-primary);

			}
		}

	}
}
</style>
