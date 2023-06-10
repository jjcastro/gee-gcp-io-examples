// Define your GCS bucket
var bucketName = 'gee-juancastro-bucket';

// Define the UI elements
var form = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '250px', height: '90%', position: 'bottom-right'}
});

var oxygenInput = ui.Textbox({
  placeholder: 'Enter oxygen value',
  style: {width: '200px'}
});

var nitrogenInput = ui.Textbox({
  placeholder: 'Enter nitrogen value',
  style: {width: '200px'}
});

var carbonInput = ui.Textbox({
  placeholder: 'Enter carbon value',
  style: {width: '200px'}
});

var latInput = ui.Textbox({
  placeholder: 'Enter latitude',
  style: {width: '200px'}
});

var lngInput = ui.Textbox({
  placeholder: 'Enter longitude',
  style: {width: '200px'}
});

var supplierIdInput = ui.Textbox({
  placeholder: 'Enter supplier ID',
  style: {width: '200px'}
});

// Add the input fields to the form
form.add(ui.Label('Oxygen'));
form.add(oxygenInput);
form.add(ui.Label('Nitrogen'));
form.add(nitrogenInput);
form.add(ui.Label('Carbon'));
form.add(carbonInput);
form.add(ui.Label('Latitude'));
form.add(latInput);
form.add(ui.Label('Longitude'));
form.add(lngInput);
form.add(ui.Label('Supplier ID'));
form.add(supplierIdInput);

// Create a button for submitting the form
var submitButton = ui.Button({
  label: 'Submit',
  onClick: function() {
    var oxygenValue = oxygenInput.getValue();
    var nitrogenValue = nitrogenInput.getValue();
    var carbonValue = carbonInput.getValue();
    var latitude = parseFloat(latInput.getValue());
    var longitude = parseFloat(lngInput.getValue());
    var supplierId = supplierIdInput.getValue();

    print('Submitted values:');
    print('Oxygen:', oxygenValue);
    print('Nitrogen:', nitrogenValue);
    print('Carbon:', carbonValue);
    print('Latitude:', latitude);
    print('Longitude:', longitude);
    print('Supplier ID:', supplierId);
    
        // Create a feature from the form values
    var feature = ee.Feature(null, {
      oxygen: oxygenValue,
      nitrogen: nitrogenValue,
      carbon: carbonValue,
      latitude: latitude,
      longitude: longitude,
      supplier_id: supplierId
    });

    // Create a feature collection with the submitted feature
    var featureCollection = ee.FeatureCollection([feature]);

    // Export the feature collection to a CSV file in GCS
    Export.table.toCloudStorage({
      collection: featureCollection,
      description: 'form_data_export',
      bucket: bucketName,
      fileNamePrefix: '/data',
      fileFormat: 'CSV'
    });

    // Clear the input fields after submitting
    oxygenInput.setValue('');
    nitrogenInput.setValue('');
    carbonInput.setValue('');
    latInput.setValue('');
    lngInput.setValue('');
    supplierIdInput.setValue('');
  }
});

// Add the submit button to the form
form.add(submitButton);

// Add the form to the map
Map.add(form);