let headers = [
  "sl_no",
  "dates",
  "lr_no",
  "bill_no",
  "destination",
  "freight_amount",
];
var data = [];
const apiDomain = 'https://pdf-bill-server.onrender.com/' || 'http://localhost:3000/'
function addRows() {
  var tableBody = document.querySelector("#myTable tbody");

  // Create a new row with input fields
  var row = document.createElement("tr");
  var sl_no_cell = document.createElement("td");
  var dates_cell = document.createElement("td");
  var lr_no_cell = document.createElement("td");
  var bill_no_cell = document.createElement("td");
  var destination_cell = document.createElement("td");
  var freight_amount_cell = document.createElement("td");
  var actionCell = document.createElement("td");

  var sl_input = document.createElement("input");
  sl_input.type = "number";
  sl_input.name = "sl[]";
  sl_input.addEventListener("input", updateData);
  sl_no_cell.appendChild(sl_input);

  var dates_input = document.createElement("input");
  dates_input.type = "number";
  dates_input.name = "dates[]";
  dates_input.addEventListener("input", updateData);
  dates_cell.appendChild(dates_input);

  var lr_input = document.createElement("input");
  lr_input.type = "number";
  lr_input.name = "lr[]";
  lr_input.addEventListener("input", updateData);
  lr_no_cell.appendChild(lr_input);

  var bill_input = document.createElement("input");
  bill_input.type = "text";
  bill_input.name = "bill[]";
  bill_input.addEventListener("input", updateData);
  bill_no_cell.appendChild(bill_input);

  var destination_input = document.createElement("input");
  destination_input.type = "text";
  destination_input.name = "dest[]";
  destination_input.addEventListener("input", updateData);
  destination_cell.appendChild(destination_input);

  var freight_input = document.createElement("input");
  freight_input.type = "text";
  freight_input.name = "freight[]";
  freight_input.addEventListener("input", updateData);
  freight_amount_cell.appendChild(freight_input);

  var removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", function () {
    row.remove();
    updateData();
  });
  actionCell.appendChild(removeBtn);

  row.appendChild(sl_no_cell);
  row.appendChild(dates_cell);
  row.appendChild(lr_no_cell);
  row.appendChild(bill_no_cell);
  row.appendChild(destination_cell);
  row.appendChild(freight_amount_cell);
  row.appendChild(actionCell);

  tableBody.appendChild(row);

  // Add the new data to the data array
  data.push([]);
}
function updateData() {
  // Update the data array with the values from the input fields
  var rows = document.querySelectorAll("#myTable tbody tr");
  data = [];

  rows.forEach(function (row) {
    var sl_input = row.querySelector('input[name="sl[]"]');
    var dates_input = row.querySelector('input[name="dates[]"]');
    var lr_input = row.querySelector('input[name="lr[]"]');
    var bill_input = row.querySelector('input[name="bill[]"]');
    var destination_input = row.querySelector('input[name="dest[]"]');
    var freight_amount_cell = row.querySelector('input[name="freight[]"]');

    data.push([
      sl_input.value,
      dates_input.value,
      lr_input.value,
      bill_input.value,
      destination_input.value,
      freight_amount_cell.value,
    ]);
  });
  console.log(data);
}
document.querySelector("#addRowBtn").addEventListener("click", function () {
  addRows();
});
function enableButton() {
  var button = document.getElementById("download-btn");
  button.disabled = false;
}
// function enableSubmitButton() {
//   if(month && pdf_no){
//     var submitButton = document.getElementById("submit-button");
//     submitButton.disabled = false;
//   }
// }
function submitApi(){
  const month = document.getElementById('Month').value;
  const pdf_no = document.getElementById("pdf_no").value;
  const submitButton = document.getElementById('submit-button');
  let uri = `generate_pdf/${month}/${pdf_no}`;
  const apiUrl = apiDomain + uri;
  console.log(apiUrl)
		submitButton.addEventListener('click', () => {
			// Send a POST request to the API endpoint with the data in the request body
			fetch(apiUrl, {
				method: 'POST',
				body: JSON.stringify({
          data: data
        }),
        mode: 'cors',
				headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
			})
      .then((response) => {
        // Our handler throws an error if the request did not succeed.
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }})
			.then(data => {
				console.log('API response:', data);
			})
			.catch(error => {
				console.error('Error:', error);
			});
    });
}
// enableSubmitButton()
document.querySelector("#submit-button").addEventListener("click", () => {
  submitApi();
  enableButton();
})

const downloadBtn = document.getElementById('download-btn');
downloadBtn.addEventListener('click', () => {
  const apiDomain = 'https://pdf-bill-server.onrender.com/' || 'http://localhost:3000'
  const apiUrl = apiDomain + 'download'; // Replace with your API URL
  console.log(apiUrl);
  fetch(apiUrl, { method: 'GET' })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'file.pdf'; // Replace with your file name
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
      }, 0);
    });
});
