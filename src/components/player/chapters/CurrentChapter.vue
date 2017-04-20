<template>
  <div class="timer-chapter">
    <span class="chapter-title" v-marquee
      :style="chapterStyle(theme)"
      v-if="currentChapterIndex(chapters) > -1">
        {{chapterTitle(chapters)}}
    </span>
  </div>
</template>

<script>
  import color from 'color'
  import get from 'lodash/get'
  import { currentChapter, currentChapterIndex } from 'utils/chapters'

  const chapterStyle = theme => ({
    color: color(theme.player.timer.chapter).fade(0.5)
  })

  const chapterTitle = chapters => {
    const current = currentChapter(chapters)
    return `${get(current, 'title', '')}`
  }

  export default {
    data() {
      return {
        chapters: this.$select('chapters'),
        theme: this.$select('theme')
      }
    },
    methods: {
      chapterStyle,
      chapterTitle,
      currentChapterIndex
    }
  }
</script>

<style lang="scss">
  @import 'animations';

  .timer-chapter {
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    
    .chapter-title {
      white-space: nowrap;
      display: inline-block;
    }
  }
</style>
