import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import "./App.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./ContactForm.css";

function ContactForm() {
    
    const {register, handleSubmit, watch, formState: { errors }} = useForm();
    const [tableData, setTableData] = useState([]);
    const [totalSalaries, setTotalSalaries] = useState(0);

    useEffect(()=>{
        const total = tableData.reduce(
            (total, row)=>(total = total + Number(row.salary)), 0
        );

        setTotalSalaries(total);
    }, [tableData]);

    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get("https://sheet.best/api/sheets/02df1873-d654-4ed9-a864-314f6ac7d0d5")
            .then((response)=>{
                console.log("google sheets data >>> ", response);
                setTableData(response.data);
            });
    };

    const submitFormToGoogle = (data) =>{
        axios
        .post(
            "https://sheet.best/api/sheets/02df1873-d654-4ed9-a864-314f6ac7d0d5",
            data 
        )
        .then((response)=>{
            alert("Row successfully added");
            setTableData([...tableData, data]);
            console.log(response);
        })
        .catch(error => alert(error.message));
    };

    return (

        <div className="contactForm">
            <h2>Annual expenses (Total salaries): ${totalSalaries}</h2>
            <table>
                <tbody>
                    {tableData.map(({age, hobby, name, salary}) => (
                        <tr>
                            <td>{age}</td>
                            <td>{hobby}</td>
                            <td>{name}</td>
                            <td>{salary}</td>
                        </tr> 
                    ))}
                </tbody>
            </table>

            <form onSubmit={handleSubmit(submitFormToGoogle)}>
                <TextField 
                    name = "name"
                    error = {errors.name}
                    helperText = {errors.name && "The Name is Required"}
                    {...register("name", { required: true})} 
                    label="Name" 
                />
                <TextField 
                    type="number"
                    error = {errors.age}
                    helperText = {errors.age?.type === "required" && "The Age is required"}
                    {...register("age", { required: true})} 
                    label="Age" 
                />
                <TextField 
                    error = {errors.salary}
                    helperText = {errors.salary && "The Salary is Required"}
                    {...register("salary", { 
                        required: true,
                    })} 
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

  )
}

export default ContactForm
