import { Button, TextField } from "@mui/material";
import './App.css';
import { useRef } from "react";
import axios from "axios";

function App() {

  const nameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const salaryInputRef = useRef(null);
  const hobbyInputRef = useRef(null);

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("Submitted");

    const tableData = {
      name: nameInputRef.current.value,
      age: ageInputRef.current.value,
      salary: salaryInputRef.current.value,
      hobby: hobbyInputRef.current.value
    }

    axios
      .post(
        "https://sheet.best/api/sheets/02df1873-d654-4ed9-a864-314f6ac7d0d5", 
        tableData
      )
      .then((response)=>{
        console.log(response);
      });
  };

  return (
    <div className="app">
      <h1>Hello world</h1>

      <form onClick={handleSubmit}>
        <TextField inputRef={nameInputRef} label="Name" />
        <TextField inputRef={ageInputRef} label="Age" />
        <TextField inputRef={salaryInputRef} label="Salary" />
        <TextField inputRef={hobbyInputRef} label="Hobby" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default App;
