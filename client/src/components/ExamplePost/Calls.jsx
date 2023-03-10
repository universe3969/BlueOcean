import React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";


// this should be used only as an example view for how Auth0 work/ not apart of final product
const Calls = () => {
  const {getAccessTokenSilently} = useAuth0();
  const user = useAuth0().user;

  async function callApi() {
    axios
      .get("http://localhost:3000/regular")
      .then((data) => console.log(data.data));
  }

  async function callProtectedApi() {
    const token = await getAccessTokenSilently();
    const response = await axios.get("http://localhost:3000/private", {
      headers: {
        authorization: `Bearer ${token}`
      },
      params: {
        // we can use params to make specific calls to userid via email
        user: user
      }
    })
      .then((data) => console.log(data.data));
  }

  return (
    <>
      <button onClick={callApi}>Call API</button>
      <br />
      <button onClick={callProtectedApi}>Call Protected API</button>
    </>
  );
};


export default Calls;
