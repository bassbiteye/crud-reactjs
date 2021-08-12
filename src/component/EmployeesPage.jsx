import React, { useEffect, useState } from "react";
import EmployeesAPI from "../services/EmployeesAPI";
const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [modalTitle ,setModalTitle] = useState("");
  const [EmployeeID ,setEmployeeID] = useState("");
  const [Name,setName] = React.useState('');
  const [Age,setAge] = React.useState('');
  const [State,setState] = React.useState('');
    const [Country,setCountry] = React.useState('');
    const onChangeName = (e) => {
      setName(e.target.value);
    }
      const onChangeAge = (e) => {
        setAge(e.target.value);
      }
      const onChangeState = (e) => {
        setState(e.target.value);
      }
      const onChangeCountry = (e) => {
        setCountry(e.target.value);
      }
  const fetchEmployees = async () => {
    try {
      const data = await EmployeesAPI.findAll();
      setEmployees(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (EmployeeID) => {
    if(window.confirm('Etes vous sure?')){
      const originalEmployees = [...employees];
      setEmployees(employees.filter((e) => e.EmployeeID != EmployeeID));
      try {
        const response= await EmployeesAPI.deleteEmployee(EmployeeID);
        fetchEmployees();
        alert(response) 
      } catch (error) {
        setEmployees(originalEmployees);
      }
      }
    
  };

  const handleSeach = ({currentTarget}) => {
    setSearch(currentTarget.value);
  };
  const originalEmployees = employees.filter(
    (e) =>
    e.Name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
    e.Country.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
     e.State.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  const  addClick = () => {
        setModalTitle("Ajouter employé");  
        setEmployeeID(""); 
        setName("");
        setAge("");
        setState("");
        setCountry("")
      //  $('#myModal').modal('show')
     
}
const editClick = (emp) =>{
  setModalTitle("Modifier employé");
  setEmployeeID(emp.EmployeeID); 
  setName(emp.Name);
  setAge(emp.Age);
  setState(emp.State);
  setCountry(emp.Country)
}

const createClick =async () => {
 // e.preventDefault();
  const newEmploye = {
    Name,
    State,
    Age,
    Country
  }
  try {
    const response=  await EmployeesAPI.addEmployee(newEmploye);
       fetchEmployees();
       alert(response) 

    } catch (error) {
      console.log(error);
    }
}

const updateClick = async ()=>{
  const EditEmploye = {
    EmployeeID,
    Name,
    State,
    Age,
    Country
  }
  try {
  const response=  await EmployeesAPI.updateEmploye(EmployeeID,EditEmploye);
  fetchEmployees();
   alert(response) 
 } catch (error) {
   console.log(error);
 }
}
  return (
    <>
  <div className="container mt-5 mb-5 d-flex justify-content-center"></div>
        <div className="card px-1 py-4">
            <div className="card-body">
      <h1>liste des employés</h1>
      <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModalCenter"
    onClick={() => addClick()}>
        Ajouter Employe
    </button>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="recherche"
          onChange={handleSeach}
          value={search}
        />
      </div>
      <table className="table hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>State</th>
            <th className="text-center">Country </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {originalEmployees.map((employee) => (
            <tr key={employee.EmployeeID}>
              <td>{employee.EmployeeID}</td>
              <td>
                  {employee.Name}
              </td>
              <td>
                  {employee.Age}
              </td>
              <td> {employee.State}</td>              
              <td className="text-center">
                {employee.Country.toLocaleString()} 
              </td>
              <td>
                <button onClick={() => editClick(employee)}
                 data-bs-toggle="modal"
                 data-bs-target="#exampleModalCenter"
                 color="warning" className="btn btn-primary ">Modifier</button>
                 /
                <button
                  onClick={() => handleDelete(employee.EmployeeID)}
                  className="btn btn-sm btn-danger"
                >
                  Supprimer
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
 <div className="modal fade" id="exampleModalCenter"    aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">{modalTitle}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
      </div>
      <div className="modal-body">
      <div className="input-group mb-3">
        <span className="input-group-text">Name</span>
        <input type="text" className="form-control"
        value={Name} onChange={onChangeName}/>
       </div>
       <div className="input-group mb-3">
        <span className="input-group-text">Age</span>
        <input type="number" className="form-control"
        value={Age} onChange={onChangeAge}/>
       </div>
       <div className="input-group mb-3">
        <span className="input-group-text">State</span>
        <input type="text" className="form-control"
        value={State} onChange={onChangeState}/>
       </div>
       <div className="input-group mb-3">
        <span className="input-group-text">Country</span>
        <input type="text" className="form-control"
        value={Country} onChange={onChangeCountry}/>
       </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary"   data-bs-dismiss="modal" aria-label="Close">Fermer</button>
        {EmployeeID==0?
        <button type="button"
        className="btn btn-success"
        onClick={() => createClick()}
        >Créer</button>
        :null}
         {EmployeeID!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={() => updateClick()}
        >Modifier</button>
        :null}
      </div>
    </div>
  </div>
</div>
</div>
    </>
  );
};

export default EmployeesPage;
