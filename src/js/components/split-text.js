import Splitting from 'splitting'
import { createObserver } from '../helpers/intersectionObsever'

export default class SplitText {
  constructor(wrap) {
    const options = {
      target: wrap, 
      by: wrap.dataset.splitBy || 'words'
    }
    
    Splitting(options)

    this.observer = createObserver()
    this.observer.observe(wrap)
  }
}