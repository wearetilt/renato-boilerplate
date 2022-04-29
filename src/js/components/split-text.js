import Splitting from 'splitting'

export default class SplitText {
  constructor(wrap) {
    const options = {
      target: wrap, 
      by: wrap.dataset.splitBy || 'words'
    }
    
    Splitting(options)
  }
}