import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function AddEmployee({
  setShowAdd,
  setEmployees,
  employees,
  editIndex,
}) {
  const [newEmployee, setNewEmployee] = useState(
    editIndex !== null
      ? employees[editIndex]
      : {
          id: "",
          name: "",
          salary: "",
          dob: "",
          designation: "",
          email: "",
          contact: "",
          address: "",
        }
  );
  const [errors, setErrors] = useState({});

  const unihandler = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    // Clear errors for the field being edited
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!newEmployee.name) newErrors.name = "Name is required";
    if (!newEmployee.salary || isNaN(newEmployee.salary))
      newErrors.salary = "Salary must be a valid number";
    if (!newEmployee.dob) newErrors.dob = "Date of Birth is required";
    if (!newEmployee.designation)
      newErrors.designation = "Designation is required";
    if (!newEmployee.contact || !/^\d{10}$/.test(newEmployee.contact))
      newErrors.contact = "Contact must be a 10-digit number";
    if (!newEmployee.email || !/\S+@\S+\.\S+/.test(newEmployee.email))
      newErrors.email = "Email must be a valid email address";
    if (!newEmployee.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setNewEmployeeData = () => {
    if (!validateInputs()) return;

    if (editIndex !== null) {
      setEmployees((prevlist) =>
        prevlist.map((emp, index) =>
          index === editIndex ? { ...newEmployee } : emp
        )
      );
      alert("Updated Successfully");
    } else {
      setEmployees((prevlist) => [
        ...prevlist,
        { ...newEmployee, id: prevlist.length + 1 },
      ]);
      alert("Added Successfully");
    }
    setShowAdd(false);
  };

  return (
    <div
      className="container border border-2 text-white p-4"
      style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: "600px",
        width: "90%",
        backgroundColor: "#a83240",
      }}
    >
      <h1 className="text-center">
        {editIndex !== null ? "Update Employee" : "Add Employee"}
      </h1>
      <CloseIcon
        color="dark"
        fontSize="large"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
          background: "red",
          borderRadius: "50%",
          padding: "4px",
          color: "white",
        }}
        onClick={() => setShowAdd(false)}
      />
      <div className="row g-3 mt-3">
        <div className="col-md-12">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={newEmployee.name}
            name="name"
            onChange={unihandler}
          />
          {errors.name && <div className="text-warning">{errors.name}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Salary</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Salary"
            value={newEmployee.salary}
            name="salary"
            onChange={unihandler}
          />
          {errors.salary && <div className="text-warning">{errors.salary}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">DOB</label>
          <input
            type="date"
            className="form-control"
            placeholder="Enter DOB"
            value={newEmployee.dob}
            name="dob"
            onChange={unihandler}
          />
          {errors.dob && <div className="text-warning">{errors.dob}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Designation</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Designation"
            value={newEmployee.designation}
            name="designation"
            onChange={unihandler}
          />
          {errors.designation && (
            <div className="text-warning">{errors.designation}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Contact</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Contact"
            value={newEmployee.contact}
            name="contact"
            onChange={unihandler}
          />
          {errors.contact && (
            <div className="text-warning">{errors.contact}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={newEmployee.email}
            name="email"
            onChange={unihandler}
          />
          {errors.email && <div className="text-warning">{errors.email}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Address"
            value={newEmployee.address}
            name="address"
            onChange={unihandler}
          />
          {errors.address && (
            <div className="text-warning">{errors.address}</div>
          )}
        </div>
      </div>
      <button
        className="btn btn-primary w-100 mt-3"
        onClick={setNewEmployeeData}
      >
        {editIndex !== null ? "Update Employee" : "Add Employee"}
      </button>
    </div>
  );
}
