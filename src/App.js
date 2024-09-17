import React, { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App (){
  const [data,setData] = useState([]);
  const [firstName , setfirstName] = useState('')
  const [lastName , setlastName] = useState('')
  const [age , setage] = useState('0')
  const [id , setid] = useState('0')
  const [isupdate , setIsupdate] = useState(false)

  useEffect(()=>{
    setData(EmployeeData)
  },[]);

 const handleEdit = (id) => {
  const dt = data.filter(item => item.id === id);
  if (dt !==undefined)
  {
    setIsupdate(true);
    setid(id);
    setfirstName(dt[0].firstName);
    setlastName(dt[0].lastName);
    setage(dt[0].age);
  }
 } 

 const handleDelete = (id) => {
  if (id > 0){
  
    if (window.confirm("Are you sure to delete this item?")){
    const dt = data.filter(item =>item.id !==id);
    setData(dt);
  }
 } 
}
const handlesave=(e) => {
  let error ='';

  if(firstName===''){
    // error +='first Name is required, ';
    alert('first Name is required')
    return;
  }
  

  if(lastName===''){
    error +='last Name is required, ';
  }
  

  if(!age || age < 1 ){
    error +='age is required .';
  }
  

  if(error ===''){
 
  e. preventDefault();
  const dt= [...data];
  const newObject = {
    id : EmployeeData.length + 1,
        firstName :firstName ,
        lastName : lastName,
        age : age
  }

  dt.push( newObject);
  setData(dt);

}
else{
  alert(error)
}

 }
 const handleupdate=() => {
  const index = data.map(item=>{return item.id;})?.indexOf(id);
  console.log(index)
   const dt =[...data];
   dt[index].firstName =firstName;
   dt[index].lastName =lastName;
   dt[index].age =age;


   setData(dt);
   handleclear();
 }
 
 const handleclear=()=> {
  setid(0);

    setfirstName('');
    setlastName('');
    setage('');
 } 

  return(
    <div class="App">
    <div style={{display: 'flex',justifycontent:'center',marginTop:"10px",marginBottom:"10px"}}>
    <div>
      <label>first Name:
        <input type='text' placeholder='Enter first name' onChange={(e)=>setfirstName(e.target.value)} value={firstName}/>
      </label>
    </div>
    <div>
      <label>last Name:
        <input type='text' placeholder='Enter last name' onChange={(e)=>setlastName(e.target.value)}value={lastName}/>
      </label>
    </div>
    <div>
      <label>age:
        <input type='number' placeholder='Enter age' onChange={(e)=>setage(e.target.value)}value={age}/>
      </label>
    </div>
    <div>
    {
      !isupdate ?
      <button className='btn btn-primary ' onClick={(e)=>handlesave(e)}>save</button>
      :
      <button className='btn btn-primary ' onClick={()=>handleupdate()}>uptade</button>

    }
    </div>
    <div> 
    </div>
    {/* <button className='btn btn-primary ' onClick={()=>handlesave()}>save</button>&nbsp;
    <button className='btn btn-primary ' onClick={()=>handleupdate()}>uptade</button>&nbsp; */}
    <button className='btn btn-danger' onClick={()=>handleclear()}>clear</button>
    </div>
    <table className= 'table table hover'>  
    <thead>
      <tr>
       <td>sr.no</td> 
       <td>id</td>
       <td>firstName</td>
       <td>lastName</td>
       <td>age</td>
       <td>Actions</td>
      </tr>
    </thead>
    <tbody>
    {
      data.map((item,index) => {
        return(
          <tr key={index}>
          <td>{index+1}</td>
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.age}</td>
          <td>
          
            <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button>&nbsp;
            <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>
          </td>
          </tr>
        )

      })
    }
    </tbody>
    </table>
    </div>
  );
}

export default App;