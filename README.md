# Google Earth Engine (GEE) and Google Cloud I/O Examples

## Writing CSVs to Google Cloud Storage

From the Earth Engine Code Editor, run [WriteSamples.js](WriteSamples.js). This will display a UI like this:

Every time the form is submitted, this will start a batch task, after confirming and running it, a new CSV file with the contents of the form will be created in the bucket set in the script.

## Reading CSVs from Google Cloud Storage

We'll use Google Cloud Storage with Google Cloud Functions.

Set up a Google Cloud Storage bucket with the default settings, and then set up a Cloud function to trigger every time a new file is added to that bucket (`On (finalizing/creating) file in the selected bucket`). Create a [Service Account to use with GEE](https://developers.google.com/earth-engine/guides/service_account) and set the function to run as this service account. In the function, [run this Python script to upload it as a Earth Engine asset](https://github.com/michaelfdewitt/ee_operationalization_demo/blob/main/example_b.py), with this [requirements.txt](https://github.com/michaelfdewitt/ee_operationalization_demo/blob/main/requirements.txt). Make sure the file has no spaces. Now every time a CSV file is uploaded to the bucket, the Cloud Function will add it as a GEE asset associated with the Cloud project in the Assets tab. A more detailed rundown on this is available in [this video](https://www.youtube.com/watch?app=desktop&v=Kt5TjH8bte4).

From the Earth Engine Code Editor, now run [ReadDisplaySamples.js](ReadDisplaySamples.js) to plot the points from the CSV in the map. You can find an example CSV for this code in [data.csv](data.csv).