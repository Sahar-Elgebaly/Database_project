import DataTable from "react-data-table-component";
import "./Volunteers.css"

export default function volunteers() {

   

    const columns = [
        {
          name: "Name",
          selector: row=>row.name,
          sortable: true,
        },
        {
          name: "Age",
          selector: row=>row.Age,
          sortable: true,
        },
        {
          name: "City",
          selector: row=>row.City,
          sortable: true,
        },
        {
          name: "Country",
          selector: row=>row.Country,
          sortable: true,
        },
        {
            name: "Action",
            selector: row=>row.action,
            sortable: true,
          },

      ];

      const data = [
        {
            id:1,
            name: "Yohn Doe",
            Age: 30,
            City: "New York",
            Country: "USA",
            action:<div>
                <button className="AccButton">Accept</button>
                <button className="DelButton">Delete</button>
                </div>
        },
        {
            id:2,
            name: "MJane Smith",
            Age: 2,
            City: "London",
            Country: "UK",
            action:<div>
                <button className="AccButton">Accept</button>
                <button className="DelButton">Delete</button>
                </div>
        },
        {
            id:3,
            name: "Ane Smith",
            Age:10,
            City: "London",
            Country: "UK",
            action:<div>
                <button className="AccButton">Accept</button>
                <button className="DelButton">Delete</button>
                </div>
        },

        {
            id:4,
            name: "Pne Smith",
            Age: 8,
            City: "London",
            Country: "UK",
            action:<div>
                <button className="AccButton">Accept</button>
                <button className="DelButton">Delete</button>
                </div>
        },
        {
            id:5,
            name: "Pne Smith",
            Age: 8,
            City: "London",
            Country: "UK",
            action:<div>
                <button className="AccButton">Accept</button>
                <button className="DelButton">Delete</button>
                </div>
        },
        {
            id:6,
            name: "Pne Smith",
            Age: 8,
            City: "London",
            Country: "UK",
            action:<div>
                <button className="AccButton" >Accept</button>
                <button className="DelButton">Delete</button>
                </div>
        },
        {
            id:7,
            name: "Pne Smith",
            Age: 8,
            City: "London",
            Country: "UK",
            action:<div>
                <button className="AccButton">Accept</button>
                <button className="DelButton">Delete</button>
                </div>
        },
        {
            id:8,
            name: "Pne Smith",
            Age: 8,
            City: "London",
            Country: "UK",
            action:<div>
                <button className="AccButton">Accept</button>
                <button className="DelButton">Delete</button>
                </div>
        },
        {
            id:9,
            name: "Pne Smith",
            Age: 8,
            City: "London",
            Country: "UK",
            action:<div>
                <button className="AccButton">Accept</button>
                <button className="DelButton">Delete</button>
                </div>
        }

  
    ];

    const customStyles={
        headCells: {
            style: {
                backgroundColor: '#00715D',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
        cells: {
            style: {
                fontSize: '14px',
            },
        },
        footer: {
            style: {
                backgroundColor: '#3f51b5',
                color: '#fff',
                fontSize: '16px',
            },
        },
    }

  return (
    <div className="containerTa">  
    
    <DataTable
        columns={columns}
        data={data}
        defaultSortField="name"
        defaultSortDesc={false}
        selectableRows
        fixedHeader={true}
        pagination
        // paginationPerPage
        highlightOnHover={true}
        striped
        responsive={true}
        customStyles={customStyles}

    ></DataTable>

    </div>

  )
}
