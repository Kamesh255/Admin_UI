import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Todo = () => {
  const [table, setTable] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateRole, setUpdateRole] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const showData = async () => {
    try {
      setLoading(true);
      const req = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const res = await req.json();
      setTable(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect((e) => {
    showData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indecOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = table.slice(indecOfFirstPost, indexOfLastPost);
  console.log(currentPosts);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let td_data = currentPosts
    .filter((el) => {
      if (search === "") {
        return el;
      } else if (el.name.toLowerCase().includes(search.toLowerCase())) {
        return el;
      } else if (el.email.toLowerCase().includes(search.toLowerCase())) {
        return el;
      } else if (el.role.toLowerCase().includes(search.toLowerCase())) {
        return el;
      }
    })
    .map((el) => {
      return (
        <tr key={el.id}>
          <td>
            <input
              className="form-check-input "
              type="checkbox"
              aria-label="Checkbox for following text input"
            />
          </td>
          <td>{el.name}</td>
          <td>{el.email}</td>
          <td>{el.role}</td>
          <td>
            <button className="btn btn-success" onClick={() => handleEdit(el)}>
              Edit
            </button>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(el.name)}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    });

  const handleDelete = (name) => {
    let newData = table.filter((el) => el.name != name);
    setTable([...newData]);
  };
  const handleEdit = (e) => {
    setShowEdit(true);
    setUpdateId(e.id);
    setUpdateName(e.name);
    setUpdateEmail(e.email);
    setUpdateRole(e.role);
  };

  const updateValue = () => {
    table.find((el) => {
      if (el.id == updateId) {
        el.name = updateName;
        el.email = updateEmail;
        el.role = updateRole;
      }
    });
    setTable([...table]);
    setUpdateId("");
    setUpdateName("");
    setUpdateEmail("");
    setUpdateRole("");
    setShowEdit(false);
    alert("Data Updated Successfully");
  };

  return (
    <>
      <div className="container">
        <h1>Admin UI</h1>
        <hr style={{ height: "5px", color: "black" }} />
        <br />
        <input
          className="form-control"
          type="text"
          placeholder="Search by name id email role..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {showEdit && (
          <div className="form-control">
            <h3 class="fw-lighter">Edit Admin UI</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                style={{ border: "none" }}
                type="text"
                placeholder="update name"
                value={updateName}
                onChange={(e) => {
                  setUpdateName(e.target.value);
                }}
              />
              <input
                style={{ border: "none" }}
                type="text"
                placeholder="update email"
                value={updateEmail}
                onChange={(e) => {
                  setUpdateEmail(e.target.value);
                }}
              />
              <select
                style={{ border: "none" }}
                name="role"
                id="role"
                form="rolform"
                value={updateRole}
                onChange={(e) => {
                  setUpdateRole(e.target.value);
                }}
              >
                <option value="member">member</option>
                <option value="admin">admin</option>
              </select>
              <button className="btn btn-success" onClick={updateValue}>
                OK
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Check</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>EDIT</th>
              <th>REMOVE</th>
            </tr>
          </thead>
          <tbody>{td_data}</tbody>
        </table> 
        <Pagination 
          postsPerPage={postsPerPage}
          totalPosts={table.length}
          paginate={paginate}
        /> 
      </div>
    </>
  );
};
export default Todo;
