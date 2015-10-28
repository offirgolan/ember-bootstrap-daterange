# Ember-bootstrap-daterange

Ember add-on-ification of [bootstrap daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker).

## Requirements
Bootstrap 3.0+

## Examples
Simple date range picker with start and end dates bound.
```handlebars
  {{bootstrap-daterange-picker startDate=start endDate=end}}
```

Single date picker with value bound.
```handlebars
  {{bootstrap-daterange-picker singleDatePicker=true startDate=date}}
```

Passing entire options object
```handlebars
  {{bootstrap-daterange-picker startDate=start endDate=end options=opts}}
```

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
