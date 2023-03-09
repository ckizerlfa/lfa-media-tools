function renameAndZip() {
  // Get the ad name input value
  const adName = document.getElementById("ad-name").value.trim();

  // Check if ad name input value is empty
  if (!adName) {
    alert("Please enter an ad name.");
    return;
  }

  // Get the file input element
  const fileInput = document.getElementById("file-upload");

  // Check if files have been selected
  if (fileInput.files.length === 0) {
    alert("Please select at least one image to upload.");
    return;
  }

  // Create a new zip object
  const zip = new JSZip();

  // Create a new CSV object
  const csv = [];

  // Loop through the selected files
  for (let i = 0; i < fileInput.files.length; i++) {
    const file = fileInput.files[i];
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop(); // get the file extension

    // Get the dimensions of the image
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function() {
      const dimensions = img.width + "X" + img.height;

      // Rename the file and add it to the zip object
      const newName = adName + "_" + dimensions + "." + fileExtension; // preserve the file extension
      zip.file(newName, file);

      // Add the file name to the CSV array
      csv.push(newName);

      // Check if all files have been processed
      if (i === fileInput.files.length - 1) {
        // Add the CSV file to the zip object
        zip.file(adName + ".csv", csv.join("\n"));

        // Generate the zip file and download it
        zip.generateAsync({ type: "blob" }).then(function(content) {
          saveAs(content, adName + ".zip");
        });
      }
    };
  }
}
