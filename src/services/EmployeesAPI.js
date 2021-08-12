import axios from 'axios';
var url = "http://localhost:55881/api/"
function findAll(){
    return  axios
    .get(url+"Employe")
    .then((response) => response.data)
}
function deleteEmployee(id){
  return   axios
    .delete(url+"Employe/"+ id)
    .then((response) => response.data)
}
function addEmployee(Employee){
    return   axios
    .post(url+"Employe", Employee)
    .then((response) => response.data)
}
function updateEmploye(id,Employee){
    return   axios
    .post(url+"Employe/"+id, Employee)
    .then((response) => response.data)
}

export default {
    findAll,
    addEmployee,
    deleteEmployee,
    updateEmploye
 
}