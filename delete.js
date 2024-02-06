app.delete('/api/users/:id' , (req,res) => {
    const id = Number(req.params.id)
    console.log(id)
    const userIndex = users.findIndex((user) => user.id === id);
    console.log(userIndex)
    users.splice(userIndex,1)
    // const newarr = users.filter((user,index) => index != userIndex)
    console.log(users);
    // console.log(newarr);
  })