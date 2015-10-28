import Ember from 'ember';

var jqueryAttrs = [
  'startDate',
  'endDate',
  'minDate',
  'maxDate',
  'dateLimit',
  'showDropdowns',
  'showWeekNumbers',
  'timePicker',
  'timePickerIncrement',
  'timePicker24Hour',
  'timePickerSeconds',
  'ranges',
  'opens',
  'drops',
  'buttonClasses',
  'applyClass',
  'cancelClass',
  'locale',
  'singleDatePicker',
  'autoApply',
  'linkedCalendars',
  'parentEl',
  'isInvalidDate',
  'autoUpdateInput'
];

export default Ember.Component.extend({
  tagName: 'input',

  jQueryOptions: Ember.computed(jqueryAttrs.join(','), function() {
    var options = {};
    var optionsObj = this.get('options');
    var self = this;

    // Allows user to pass an entire config object
    if (!Ember.isNone(optionsObj) && typeof optionsObj === 'object') {
      optionsObj.startDate = this.get('startDate');
      optionsObj.endDate = this.get('endDate');
      return optionsObj;
    }

    jqueryAttrs.forEach(function(attr) {
      options[attr] = self.get(attr);
    });
    return options;
  }),

  didInsertElement: function() {
    this._super.apply(this, arguments);
    Ember.run.schedule('afterRender', this, this._renderDatePicker);
  },

  _renderDatePicker: function() {
    this.$().daterangepicker();
    this._setOptions();
    this._setStart();
    this._setEnd();
  },

  _setStart: function() {
    if (this.state === 'inDOM') {
      var dateRangePickerObject = this.$().data('daterangepicker');
      if (dateRangePickerObject) {
        dateRangePickerObject.setStartDate(this.get('startDate'));
      }
    }
  },

  _setEnd: function() {
    if (this.state === 'inDOM') {
      var dateRangePickerObject = this.$().data('daterangepicker');
      if (dateRangePickerObject) {
        dateRangePickerObject.setEndDate(this.get('endDate'));
      }
    }
  },

  _setOptions: function() {
    if (this.state === 'inDOM') {
      this.$().daterangepicker(this.get('jQueryOptions'), this._optionsChangedCallback.bind(this));
    }
  },

  _optionsChangedCallback: function(start, end) {
    this.set('startDate', start);
    this.set('endDate', end);
  },

  startDateDidChange: Ember.observer('startDate', function() {
    Ember.run.once(this, this._setStart);
  }),

  endDateDidChange: Ember.observer('endDate', function() {
    Ember.run.once(this, this._setEnd);

  }),

  dateOptionsChanged: Ember.observer('jQueryOptions', function() {
    Ember.run.once(this, this._setOptions);
  }),

  willDestroyElement: function() {
    this._super.apply(this, arguments);
    if (this.state === 'inDOM' && this.$().data('daterangepicker')) {
      this.$().daterangepicker('remove');
    }
  }
});
