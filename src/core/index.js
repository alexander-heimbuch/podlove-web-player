import Vue from 'vue'
import clipboard from './directives/clipboard'
import marquee from './directives/marquee'
import translate from './translate'

const createRenderer = instance => {
  instance.directive('clipboard', clipboard)
  instance.directive('marquee', marquee)
  return instance
}

const Renderer = createRenderer(Vue)

export {
  translate,
  Renderer
}
