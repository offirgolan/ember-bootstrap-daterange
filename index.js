/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-bootstrap-daterange',

  included: function(app) {
    this._super.included(app);

    this.app.import(app.bowerDirectory + '/moment/moment.js');
    this.app.import(app.bowerDirectory + '/bootstrap-daterangepicker/daterangepicker.js');
    this.app.import(app.bowerDirectory + '/bootstrap-daterangepicker/daterangepicker.css');
  }
};
