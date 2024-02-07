import { useEffect, useState } from 'react'
import axios from 'axios'

function Showing() {
  const [jsonData , setJsonData] = useState(null)
  const [FormData , setFormData] = useState({ first_name: '', last_name: '', ip_address: '' })
useEffect(()=>{
  console.log(jsonData)
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/users' , FormData , {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      console.log(response)
      if(response.status === 200) {
        setJsonData(response.data)
      }
      else{
        console.log("failed to fetch data")
      }
    } catch (error) {
      console.log(`Error ${error}`)
    }
  }
  fetchData();
},[])

const handleInputChange = (e) => {
    const {name, value} = e.target;
    console.log("Input Change - Name:", name, "Value:", value);
    setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
    }));
};

const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', FormData);
      if (response.status === 200) {
        // Update the state with the new data
        setJsonData([...jsonData, response.data.newuser]);
        // Clear the form data
        setFormData({ first_name: '', last_name: '', ip_address: '' });
      } else {
        console.log("Failed to add user");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <>
      <div className="app">
        <form onSubmit={handleFormSubmit} >
        <label>
        First Name:
          <input type="text" name="first_name" value={FormData.first_name} onChange={handleInputChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={FormData.last_name} onChange={handleInputChange} />
        </label>
        <label>
          IP Address:
          <input type="text" name="ip_address" value={FormData.ip_address} onChange={handleInputChange} />
        </label>
        <button type="submit">Add User</button>
        </form>
        </div>
    </>
  )
}

export default Showing
