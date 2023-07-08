import { Button, TextField } from "@mui/material";
import './App.css';
import axios from "axios";
import { useForm } from "react-hook-form";

function App() {

  const {register, handleSubmit, watch, formState: { errors }} = useForm();

  const submitFormToGoogle = (data) =>{
    axios
      .post(
        "https://sheet.best/api/sheets/02df1873-d654-4ed9-a864-314f6ac7d0d5",
        data 
      )
      .then((response)=>{
        alert("Row successfully added");
        console.log(response);
      })
      .catch(error => alert(error.message));
  };

  return (
    <div className="app">
      <h1>Hello world</h1>

      <form onSubmit={handleSubmit(submitFormToGoogle)}>
        <TextField 
          name = "name"
          error = {errors.name}
          helperText = {errors.name && "The Name is Required"}
          {...register("name", { required: true})} 
          label="Name" 
        />
        <TextField 
          error = {errors.age}
          helperText = {errors.age && "The Age is Required"}
          {...register("age", { required: true })} 
          label="Age" 
        />
        <TextField 
          error = {errors.salary}
          helperText = {errors.salary && "The Salary is Required"}
          {...register("salary", { required: true })} 
          label="Salary" 
        />
        <TextField 
          error = {errors.hobby}
          helperText = {errors.hobby && "The Hobby is Required"}
          {...register("hobby", { required: true })} 
          label="Hobby" 
        />
        <Button variant="outlined" type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default App;
