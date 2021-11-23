// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
// d3 is a js library that produces sophisticated and highly dynamic graphics in an HTML webpage
//With this code, we:
//Declare a variable, tbody
//Use d3.select to tell JavaScript to look for the <tbody> tags in the HTML
//the data will fit into that tag because it's a standard table tag that is used often in HTML
var tbody = d3.select("tbody");

function buildTable(data) {
    tbody.html("");//clears the table
    data.forEach((dataRow) => {
        let row = tbody.append("tr");//"tr" is the abbreviation for table row. this is because table row tags in HTML are <tr>
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");//<td> is the "table data" html tag
            cell.text(val);
        //By starting our line of code with Object.values, we're telling JavaScript to reference one object from the array of UFO sightings. 
        //By adding (dataRow) as the argument, we are saying that we want the values to go into the dataRow. 
        //We've added forEach((val) to specify that we want one object per row.
        //val is one piece of data in the dataset
        });

    }); 
};

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);    
    // 4b. Save the value that was changed as a variable.
    let elementValue = changedElement.property("value");
    console.log(elementValue)
    // 4c. Save the id of the filter that was changed as a variable.
    let filterID = changedElement.attr("id");
    console.log(filterID);
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {
        filters[filterID] = elementValue;
    }
    else {
        delete filters[filterID];
    }

    // 6. Call function to apply all filters and rebuild the table
    filterTable();

  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData = tableData;
    let date = d3.select("#datetime").property("value");
    let city = d3.select("#city").property("value");
    let state = d3.select("#state").property("value");
    let country = d3.select("#country").property("value");
    let shape = d3.select("#shape").property("value");

    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    for (var filterID in filters){
        if (filterID === "datetime") {
            filteredData = filteredData.filter(row => row.datetime === date);
        }
        else if (filterID === "city") {
            filteredData = filteredData.filter(row => row.city === city);
        }
        else if (filterID === "state") {
            filteredData = filteredData.filter(row => row.state === state);
        }
        else if (filterID === "country") {
            filteredData = filteredData.filter(row => row.country === country);
        }
            else if (filterID === "shape") {
                filteredData = filteredData.filter(row => row.shape === shape);
        } 
    };
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData)
  };
  
// 2. Attach an event to listen for changes to each filter
d3.selectAll("input").on("change", updateFilters);

//There is only a single step left before we can build the HTML component of the webpage: making sure the table loads as soon as the page does.
buildTable(tableData);

//function handleClick() { 
  //  let date = d3.select("#datetime").property("value");
    //let filteredData = tableData;
    // pseudocode practice
    //if (a date is entered) {
    //Filter the default data to show only the date entered
    //};

    //if (date) {
    //    filteredData = filteredData.filter(row => row.datetime === date);
    //};//Show only the rows where the date is equal to the date filter we created above.
       // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    //buildTable(filteredData);
//};

//d3.selectAll("#filter-btn").on("click", handleClick);
//Our selector string contains the id for another HTML tag. (We'll assign a unique id to a button element in the HTML called "filter-btn".) 
//This time it'll be included in the button tags we create for our filter button. By adding this, we're linking our code directly to the filter button.
//Also, by adding .on("click", handleClick);, we're telling D3 to execute our handleClick() function when the button with an id of filter-btn is clicked.



