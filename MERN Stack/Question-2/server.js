const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;
const users = [
    { id: 1, name: 'Prachi Panwar', email: 'prachi@example.com' },
    { id: 2, name: 'Annie', email: 'annie@example.com' },
    { id: 3, name: 'Max', email: 'max@example.com' }
  ];

app.get("/users", (req,resp)=>{
    resp.json(users);
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });