import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import ReactSelect from 'react-select';
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../Store/store.js";


// Don't change this <main> wrapper, this tag is used in App.scss
export default function EditProfile() {
  const {getAccessTokenSilently} = useAuth0();
  const user = useAuth0().user;
  const navigate = useNavigate();
  const curId = useUserStore((state) => state.curId);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([
  {value: 'apple', label: 'apple'}
    ])

  const [inputs, setInputs] = useState({});
  const [bio, setBio] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleBioChange = () => {
    const name = event.target.name;
    const value = event.target.value;
    setBio(values => ({...values, [name]: value}))
  }


  inputs.email=user?.email
  const interests = [bio.interest1, bio.interest2 || null, bio.interest3 || null];

  const info = {
    age: bio.age,
    gender: bio.gender,
    name: bio.name,
    interest: interests
  };

  const data = {
    bio: info,
    username: inputs.username,
    email : user?.email,
    avator: inputs.avator
  };


  async function callUserinfo() {
    if(!curId) return
    const token = await getAccessTokenSilently();
    const response = await axios.get("http://localhost:3000/users/info/",{
      headers: {
        authorization: `Bearer ${token}`
      },
      params: {
        // we can use params to make specific calls to userid via email
        id: curId
      }
    })
    .then(data => {
      // console.log(data)
      setInputs((values) => ({...values, username: data.data.username}));
      bio.interest1= data.data.bio.interest[0]
      bio.interest2= data.data.bio.interest[1] || ""
      bio.interest3= data.data.bio.interest[2] || ""
      bio.age = data.data.bio.age
      bio.name= data.data.bio.name
      bio.gender = data.data.bio.gender
      inputs.avator= data.data.avator
      // Assuming the photo is stored as a URL in the database
      // setPhoto(data.photoUrl);
    })
    .catch(error => console.error(error));
  }
  async function updateUserinfo() {
    if(!curId) return
    const token = await getAccessTokenSilently();
    const response = await axios.post("http://localhost:3000/users/info/",{data},{
      headers: {
        authorization: `Bearer ${token}`
      },
      params: {
        id: curId
      },
    })
    .then(data => {

    })
    .catch(error => console.error(error));
  }
  async function callGenre() {
    if(!curId) return
    const token = await getAccessTokenSilently();
    const response = await axios.get("http://localhost:3000/users/genre/",{
      headers: {
        authorization: `Bearer ${token}`
      },
      params: {
        // we can use params to make specific calls to userid via email
        id: curId
      }
    })
    .then(data => setSelectedOptions(data.data))
  }
  async function updateGenre() {
    if(!curId) return
    const token = await getAccessTokenSilently();
    const response = await axios.post("http://localhost:3000/users/genre/",{selectedOptions},{
      headers: {
        authorization: `Bearer ${token}`
      },
      params: {
        id: curId
      },
    })
  }

  useEffect(() => {
    console.log(user)
    callUserinfo();
    callGenre();
    axios.get('http://localhost:3000/explore/genre-options')
    .then((data) => {
      var optionsArray = [];
      data.data.rows.forEach((genre) => {
        let optionObject = {
          value: genre.genre,
          label: genre.genre
        }
        // console.log('this is the single option', optionObject)
        optionsArray.push(optionObject);
      })
      // console.log('this is the options array');
      setAvailableOptions(optionsArray);
      })
      .catch(err => {
        console.log(err);
      })
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the updated form data to the server-side script using fetch or Axios
    updateUserinfo();
    updateGenre();
    // navigate("/explore")

    // console.log(inputs);
  }

  return (
    <main>
    <form onSubmit={handleSubmit}>
      <label>Enter your photo:
      <input
        type="text"
        name="avator"
        value= {inputs.avator || ""}
        required
        onChange={handleChange}
      />
      </label>
      <label>Enter your username:
      <input
        type="text"
        name="username"
        value= {inputs.username || ""}
        required
        onChange={handleChange}
      />
      </label>
      <label>Enter your Name:
        <input
          name="name"
          required
          value={bio.name || ""}
          onChange={handleBioChange}
        />
        </label>
      <label>Enter your age:
        <input
          name="age"
          required
          value={bio.age || ""}
          onChange={handleBioChange}
        />
        </label>
      <label>Enter your gender:
        <input
          name="gender"
          required
          value={bio.gender || ""}
          onChange={handleBioChange}
        />
         </label>
      <label>Enter your interest:
        <input
          name="interest1"
          required
          value={bio.interest1 || ""}
          onChange={handleBioChange}
        />
        </label>
      <label>Enter your interest:
        <input
          name="interest2"
          value={bio.interest2 || ""}
          onChange={handleBioChange}
        />
        </label>
      <label>Enter your interest:
        <input
          name="interest3"
          value={bio.interest3 || ""}
          onChange={handleBioChange}
        />
        </label>
       <ReactSelect
          options={availableOptions}
          value={selectedOptions}
          onChange={setSelectedOptions}
          isMulti={true}
          isSearchable={true}
        />
        <input type="submit" />
    </form>
    </main>
  );
}