const express = require ('express');
const fs = require('fs')
const users = require("./MOCK_DATA.json");
const app = express();
app.use(express.urlencoded({extended : true}))
app.use(express.json());


const PORT = 8000


// app.delete('/api/users/:id' , (req,res) => {
//   const id = Number(req.params.id)
//   console.log(id)
//   const userIndex = users.findIndex((user) => user.id === id);
//   console.log(userIndex)
//   console.log(users.length)
//   users.splice(userIndex,1)
//   // const newarr = users.filter((user,index) => index != userIndex)
//   console.log(users);
//   // console.log(newarr);
// })

app
.route('/api/users')
.get((req,res) => {
    return res.send(users)
})
.post((req, res) => {
  const body = req.body;
  console.log(body);
  const newUserId = users.length + 1;
  const newUser = { ...body, id: newUserId };
  users.push(newUser);

  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log(newUser);
    return res.status(200).json({ newuser: newUser });
  });
});
app.patch('/api/users',(req,res) => {
    const bodyId = Number(req.body.id);
    const body = req.body;
    const olduser = users.find((user) => 
      user.id === bodyId
    )
    olduser.first_name = body.first_name
    // console.log(users)
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err,data)=>{
        const newuser = users.find((user)=>
          user.id === bodyId
        )
        console.log(newuser)
        res.send(newuser)
    })

    // console.log(bodyId)
    // console.log(olduser)
    // console.log(body)

    
})













//dynamic parameter passing 
// app.get('/api/users/:id',(req,res) => {
//     const id =  Number(req.params.id)
//     const user = users.find((user) =>
//       user.id === id
//     )
//     return res.send(user.first_name)
// })
// app.get('/api/users/:name' , (req,res) => {
//     const name = String(req.params.name)
//     const user = users.find((user) => user.first_name === name)
//     return res.send(user) 
// })


// app
// .route('/api/users')
// .get((req,res) => {
//     return res.send(users)
// })
// .post((req,res) => {
//    const body = req.body;
//    console.log(body)
//    users.push({...body, id : users.length + 1})
// //    console.log(users)
// //{ does impact in finding in json}
//    fs.writeFile('./MOCK_DATA.json' , JSON.stringify(users) , (err,data) => {
//     const newuser = users.find((user) => 
//         user.id === users.length-1
//      )
//      console.log(newuser)
//      return res.json({newuser})
//    })
// })
// .get((req,res) => {
//     const id =  Number(req.params.id)
//     const user = users.find((user) =>
//       user.id === id
//     )
//     return res.send(user.first_name)
// })
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})