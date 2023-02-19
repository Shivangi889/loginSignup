import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();
    var allData = [];
    function GetData() {
        const Token = window.localStorage.getItem("token");
        if (Token == null) {
            navigate("/sign-in");
        }
        fetch("http://localhost:5000/getalluserdata", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ token: Token }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userData");
                setUsersData(data.data);
            });
    }
    useEffect(GetData, []);

    const users = usersData.map((user,index) => (
        <tr key={user._id}>
        <th scope="row">{index+1}</th>
        <td>{user?.fname +" "+user?.lname}</td>
        <td>{user?.email}</td>
        <td><button className="btn btn-warning btn-sm">Edit</button></td>
        <td><button className="btn btn-danger btn-sm">Delete</button></td>
      </tr>
      ));

    return <div>
   <table>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name </th>
      <th scope="col">Email</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {users}
  </tbody>
</table>
  </div>;
}




