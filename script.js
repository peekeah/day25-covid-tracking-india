//Creating nav
const nav = document.createElement('nav');
nav.setAttribute('class', 'bg-dark');
nav.innerHTML = `<h1>Covid report of India</h1>`;
document.body.appendChild(nav);

//Creating div with class name container 
const container = document.createElement('div');
container.setAttribute('class', 'container');
document.body.appendChild(container);

//Appending data in container using innerHTML
container.innerHTML = 
`
<div class="state-list"></div>
<div class="pagination"></div>
`;

//Async function getData declaration
async function getData()
{
    try {
        //Fetching API data
        const data = await fetch("https://data.covid19india.org/v4/min/data.min.json", {method: "GET"});
        const result = await data.json();

        //Pagination
        let cardPerPage = 6;
        let totalPages = Math.ceil(Object.entries(result).length / cardPerPage);
        let currentPage = 1;

        let paginationPath = document.querySelector(".pagination");

        //Creating Buttons
        //First button
        const first = document.createElement("button");
        first.setAttribute("class","first btn btn-primary");
        first.innerText = "First"
        paginationPath.append(first);
        first.onclick = () => {
            currentPage = 1;
            console.log(currentPage);
            const pageData = slicedData(currentPage);
            document.querySelector(".state-list").innerHTML = "";
            pageData.forEach(state => displayData(state));
            //logic for hiding previous button and displaying next button
            previous.setAttribute("style","display: none");
            next.setAttribute("style","display: inline-block");
        }

        let previous = document.createElement("button"); //Creating Previous Button
        previous.innerText = "Previous";
        previous.setAttribute("class","btn btn-primary");
        previous.setAttribute("style","display: none"); //hiding previous button by default
        paginationPath.append(previous);
        previous.onclick = () => {
            console.log("Clicked => Previous");
            --currentPage;
            if(currentPage > 1) {
                console.log(currentPage);
                const pageData = slicedData(currentPage);
                document.querySelector(".state-list").innerHTML = "";
                pageData.forEach(state => displayData(state));
            }

            //logic for hiding and displaying previous and next buttons
            if(currentPage>1) {
                previous.setAttribute("style","display: inline-block");
            }
            else {
                previous.setAttribute("style","display: none");
            }

            if(currentPage<totalPages) {
                next.setAttribute("style","display: inline-block");
            }
            else {
                next.setAttribute("style","display: none");
            }
        }

        //Creating buttons with page number
        for(let i=1; i<=totalPages; i++) {
            let page = document.createElement("button");
            page.innerHTML = i;
            page.setAttribute("class","page-button btn btn-primary"); 
            paginationPath.append(page);
            page.onclick = () => {
                console.log("Clicked => ", i);
                currentPage = i;
                const pageData = slicedData(currentPage);
                document.querySelector(".state-list").innerHTML = "";
                pageData.forEach(state => displayData(state));

                //logic for hiding and displaying previous and next buttons
                if(currentPage>1) {
                    previous.setAttribute("style","display: inline-block");
                }
                else {
                    previous.setAttribute("style","display: none");
                }

                if(currentPage<totalPages) {
                    next.setAttribute("style","display: inline-block");
                }
                else {
                    next.setAttribute("style","display: none");
                }
            }
        }

        //Creating next buttons
        let next = document.createElement("button");
        next.setAttribute("class","btn btn-primary");
        next.innerText = "Next";
        paginationPath.append(next);
        next.onclick = () => {
            console.log("Clicked => Next");
            ++currentPage;
            if(currentPage!=totalPages) {
                console.log(currentPage);
                const pageData = slicedData(currentPage);
                document.querySelector(".state-list").innerHTML = "";
                pageData.forEach(state => displayData(state));
            }
            
            //logic for hiding and displaying previous and next buttons
            if(currentPage>1) {
                previous.setAttribute("style","display: inline-block");
            }
            else {
                previous.setAttribute("style","display: none");
            }

            if(currentPage<totalPages) {
                next.setAttribute("style","display: inline-block");
            }
            else {
                next.setAttribute("style","display: none");
            }
        }

        // Slicing current page data;
        function slicedData(currentPage = 0) {
            const data = Object.entries(result).slice((currentPage-1)*cardPerPage, (currentPage*cardPerPage));
            return data;
        }

        //Last button
        const last = document.createElement("button");
        last.setAttribute("class","last btn btn-primary");
        last.innerText = "Last"
        paginationPath.append(last);
        last.onclick = () => {
            currentPage = totalPages;
            console.log(currentPage);
            const pageData = slicedData(currentPage);
            document.querySelector(".state-list").innerHTML = "";
            pageData.forEach(state => displayData(state));
            //logic for displaying previous button and hiding next button
            previous.setAttribute("style","display: inline-block");
            next.setAttribute("style","display: none");
        }
        //Display default data
        const defaultPageData = slicedData(currentPage);
        defaultPageData.forEach(state => displayData(state));
        }
        catch (error) {
            console.log(error);
        }
}

    
getData(); //calling function getData

//Declaring function displayData to print the details
function displayData([name, detail]) {

    const confirmed = detail.total.confirmed;
    const deceased = detail.total.deceased;
    const recovered = detail.total.recovered;
    const tested = detail.total.tested;
    const vaccinated1 = detail.total.vaccinated1;
    const vaccinated2 = detail.total.vaccinated2;
    
    //Printing data in card
    document.querySelector(".state-list").innerHTML += `
    <div class="card">
            <h3>${name}</h3>
            <table>
                <tr>
                    <td>Confirmed :</td>
                    <td>${confirmed}</td>
                </tr>
                <tr>
                    <td>Deceased :</td>
                    <td>${deceased}</td>
                </tr>
                <tr>
                    <td>Recovered :</td>
                    <td>${recovered}</td>
                </tr>
                <tr>
                    <td>Tested :</td>
                    <td>${tested}</td>
                </tr>
                <tr>
                    <td>Vaccinated 1 :</td>
                    <td>${vaccinated1}</td>
                </tr>
                <tr>
                    <td>Vaccinated 2 :</td>
                    <td>${vaccinated2}</td>
                </tr>
            </table>
        </div>
    `
}