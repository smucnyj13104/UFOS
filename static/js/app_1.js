// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
// d3 is a js library that produces sophisticated and highly dynamic graphics in an HTML webpage
//With this code, we:
//Declare a variable, tableBody
//Use d3.select to tell JavaScript to look for the <tableBody> tags in the HTML
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

//There is only a single step left before we can build the HTML component of the webpage: making sure the table loads as soon as the page does.
buildTable(tableData);

function handleClick() { 
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
    // pseudocode practice
    //if (a date is entered) {
    //Filter the default data to show only the date entered
    //};

    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    };//Show only the rows where the date is equal to the date filter we created above.
       // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
};

d3.selectAll("#filter-btn").on("click", handleClick);
//Our selector string contains the id for another HTML tag. (We'll assign a unique id to a button element in the HTML called "filter-btn".) 
//This time it'll be included in the button tags we create for our filter button. By adding this, we're linking our code directly to the filter button.
//Also, by adding .on("click", handleClick);, we're telling D3 to execute our handleClick() function when the button with an id of filter-btn is clicked.



