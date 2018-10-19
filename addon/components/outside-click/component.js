
import Ember from 'ember'
import layout from './template'

export default Ember.Component.extend({
  onOutsideClick() {},

  init() {
    this._super(...arguments)
    this.handleDown = this.handleDown.bind(this)
    this.handleUp = this.handleUp.bind(this)
  },

  layout,
  classNames: ['outside-click'],
  excludedClasses: [],
  excludedIds: [],

  didInsertElement() {
    this._super(...arguments)
    document.addEventListener('mousedown', this.handleDown, true)
    document.addEventListener('mouseup', this.handleUp, true)
  },

  willDestroyElement() {
    this._super(...arguments)
    document.removeEventListener('mousedown', this.handleDown, true)
    document.removeEventListener('mouseup', this.handleUp, true)
  },

  isOutside: false,

  handleDown(e) {
    if (this.isDestroyed || this.isDestroying) return

    let isClassExcluded = this.get('excludedClasses').some((excludedClass) => {
      return e.target.className === excludedClass;
    });
    
    let isIdExcluded = this.get('excludedIds').some((excludedId) => {
      return e.target.id === excludedId;
    });

    if (!(this.element.contains(e.target) || isClassExcluded || isIdExcluded)) {
      this.set('isOutside', true)
    }
  },

  handleUp(e) {
    if (this.get('isOutside')) this.get('onOutsideClick')(e)
    if (this.isDestroyed || this.isDestroying) return
    this.set('isOutside', false)
  }
})
