import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEmployee from "./AddEmployee";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Image from "../assets/background.webp";
export default function Employee() {
  const [employees, setEmployees] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const searchInput = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const filteredEmp = employees.filter((employee) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    return (
      employee.id.toString().includes(searchTerm) ||
      employee.name.toLowerCase().includes(lowerCaseTerm) ||
      employee.salary.toString().includes(searchTerm) ||
      employee.designation.toLowerCase().includes(lowerCaseTerm) ||
      employee.dob.includes(searchTerm) ||
      employee.contact.toString().includes(searchTerm) ||
      employee.email.toLowerCase().includes(lowerCaseTerm) ||
      employee.address.toLowerCase().includes(lowerCaseTerm)
    );
  });

  const handleDelete = (index) => {
    setEmployees((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowAdd(true);
  };

  return (
    <div
      className="container p-4 text-white"
      style={{
        marginTop: "150px",
        background: "#a83240",
        borderRadius: "8px",
        backgroundImage: { Image },
      }}
    >
      <h1 className="text-center mb-4" style={{ fontSize: "2.1rem" }}>
        Employee Management App
      </h1>

      <div className="row g-3">
        <div className="col-md-6">
          <button
            className="btn btn-primary w-100"
            onClick={() => {
              setEditIndex(null);
              setShowAdd(true);
            }}
          >
            Add Employee
          </button>
        </div>
        <div className="col-md-6">
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            onChange={(e) => searchInput(e.target.value)}
          />
        </div>
      </div>

      {showAdd && (
        <AddEmployee
          setShowAdd={setShowAdd}
          setEmployees={setEmployees}
          employees={employees}
          editIndex={editIndex}
        />
      )}

      <div className="mt-4">
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Salary</th>
                <th>Designation</th>
                <th>DOB</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmp.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.salary}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.contact}</td>
                  <td>{emp.email}</td>
                  <td>{emp.address}</td>
                  <td>
                    <button
                      className="btn btn-success m-1"
                      onClick={() => handleEdit(index)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="btn btn-danger m-1"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteForeverIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
