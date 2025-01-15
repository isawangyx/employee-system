import { useState } from "react";
import { useAddEmployeeMutation } from "../store/Employees/employeeApi";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [addEmployee] = useAddEmployeeMutation();

  const handleSubmit = async () => {
    if (name && salary && (department === "HR" || department === "PS")) {
      await addEmployee({ name, salary: Number(salary), department });
    } else {
      alert("Please enter a valid department (HR or PS)");
    }
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
      <input
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Employee</button>
    </div>
  );
};

export default AddEmployee;
