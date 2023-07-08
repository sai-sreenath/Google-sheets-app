import { Button, TextField } from "@mui/material";
import './App.css';
import axios from "axios";
import { useForm } from "react-hook-form";

function App() {

  const {register, handleSubmit} = useForm();

  const submitFormToGoogle = (data) =>{

    console.log(data);

    const {name, age, salary, hobby} = data;

    const tableData = {
      name,
      age,
      salary,
      hobby,
    };

    axios
      .post(
        "https://sheet.best/api/sheets/02df1873-d654-4ed9-a864-314f6ac7d0d5", 
        tableData
      )
      .then((response)=>{
        alert("Row successfully added");
        console.log(response);
      });
  };

  return (
    <div className="app">
      <h1>Hello world</h1>

      <form onSubmit={handleSubmit(submitFormToGoogle)}>
        <TextField {...register("name")} label="Name" />
        <TextField {...register("age")} label="Age" />
        <TextField {...register("salary")} label="Salary" />
        <TextField {...register("hobby")} label="Hobby" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default App;
