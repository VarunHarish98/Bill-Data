let headers = [
  "sl_no",
  "dates",
  "lr_no",
  "bill_no",
  "destination",
  "freight_amount",
];
var data = [];
const apiDomain =
  "https://pdf-bill-server.onrender.com/" || "http://localhost:3000/";

  let pdf_no = document.getElementById("pdf_no");
  pdf_no.addEventListener("keypress", (e) => {
    const key = e.which || e.keyCode;
    console.log(e)
    if ((key < 48 || key > 57)) {
      // Prevent the default action
      alert("Input only 3 digit numbers")
      e.preventDefault();
  }
})
const regex = /[0-9]{2}-[a-zA-Z]{3}-[0-9]{2}/gmi;
let year = document.getElementById("Year");
year.addEventListener("keypress", (e) => {
  const key = e.which || e.keyCode;
    console.log(e)
    if ((key < 48 || key > 57)) {
      // Prevent the default action
      alert("Input only years")
      e.preventDefault();
    }
})

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
  sl_input.type = "text";
  sl_input.name = "sl[]";
  sl_input.maxLength = 3
  sl_input.addEventListener("input", updateData);
  sl_no_cell.appendChild(sl_input);
  sl_input.addEventListener("keypress", (e) => {
    const key = e.which || e.keyCode;
    if ((key < 48 || key > 57)) {
      // Prevent the default action
      alert("Input only numbers")
      e.preventDefault();
  }
  })

  var dates_input = document.createElement("input");
  dates_input.type = "text";
  dates_input.name = "dates[]";
  dates_input.placeholder = "Eg. 23-Jan-23"
  dates_input.addEventListener("input", updateData);
  dates_cell.appendChild(dates_input);

  var lr_input = document.createElement("input");
  lr_input.type = "number";
  lr_input.name = "lr[]";
  lr_input.addEventListener("input", updateData);
  lr_no_cell.appendChild(lr_input);
  lr_no_cell.addEventListener("keypress", (e) => {
    const key = e.which || e.keyCode;
    if ((key < 48 || key > 57)) {
      // Prevent the default action
      alert("Input only numbers")
      e.preventDefault();
  }
  })

  var bill_input = document.createElement("input");
  bill_input.type = "text";
  bill_input.name = "bill[]";
  bill_input.addEventListener("input", updateData);
  bill_no_cell.appendChild(bill_input);
  bill_no_cell.addEventListener("keypress", (e) => {
    const key = e.which || e.keyCode;
    if ((key < 48 || key > 57)) {
      // Prevent the default action
      alert("Input only numbers")
      e.preventDefault();
  }
  })
  function addOption() {
    // Retrieve existing options from local storage or create an empty array if no options exist yet
    console.log("dfsdf")
    const options = JSON.parse(localStorage.getItem("options")) || [];
  
    // Prompt user for option to add
    const newOption = prompt("Enter new option:");
  
    // Add new option to options array
    options.push(newOption);
  
    // Save updated options array to local storage
    localStorage.setItem("options", JSON.stringify(options));
    console.log(localStorage)
  
    // Create new option element and add to dropdown
    const optionElement = document.createElement("option");
    optionElement.value = newOption;
    optionElement.text = newOption;
    destination_input.add(optionElement);
  }
  document.querySelector("#dropdown-container").addEventListener("click", function () {
    console.log("bbbbbbbbbbbb")
    addOption();
  });
  
  var destination_input = document.createElement("select");
  destination_input.text = "option";
  destination_input.name = "dest[]";
  // destination_input.addEventListener("change", function() {
  //   localStorage.setItem("selectedOption", destination_input.value);
  // });
  destination_input.addEventListener("input", updateData);
  let options = localStorage.getItem('options');
  let dest = localStorage.getItem('options') && typeof(options) === 'string' ? JSON.parse(options) : options;
  for (let i in dest) {
    var option = document.createElement("option");
    option.text = dest[i];
    //option.value = i + 1; // set the value to the index + 1
    destination_input.add(option);
  }
  destination_input.addEventListener('change', function() {
    // get the selected value of the dropdown
    const selectedValue = destination_input.value;
    
    // do something with the selected value
    console.log(selectedValue);
  });
  destination_cell.appendChild(destination_input);

  var freight_input = document.createElement("input");
  freight_input.type = "text";
  freight_input.name = "freight[]";
  freight_input.placeholder = "Roundoff nearest decimal"
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
    var destination_input = row.querySelector('select[name="dest[]"]');
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


const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", () => {
  const month = document.getElementById("Month").value;
const pdf_no = document.getElementById("pdf_no").value;
const year = document.getElementById("Year").value;
let uri = `generate_pdf/${month}/${year}/${pdf_no}`;
const apiUrl = apiDomain + uri;
console.log(apiUrl);
  // Send a POST request to the API endpoint with the data in the request body
  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({
      data: data,
    }),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      // Our handler throws an error if the request did not succeed.
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
    })
    .then((data) => {
      console.log("API response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

const downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", () => {
  let month = document.getElementById("Month").value;
  let filename = `${month}_2023_Surya_Transport.pdf`;
  const apiDomain =
    "https://pdf-bill-server.onrender.com/" || "http://localhost:3000";
  const apiUrl = apiDomain + "download"; // Replace with your API URL
  console.log(apiUrl);
  fetch(apiUrl, { method: "GET" })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      console.log(filename);
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    });
});
