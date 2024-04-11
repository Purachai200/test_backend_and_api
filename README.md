.env
DATABASE_URL = **********
** use node seed.js for seed prisma db **
server is run on port 3000

route => 
GET /stores             : Retrieves and sends data about stores and all discounts available in the database.
GET /stores/:id         : Retrieves and sends data about discounts related to a store with the specified ID.
POST /stores/:id/claim  : Creates a new discount claim for a user specified by the ID of the discount and the user. 
(in this example, simulating a user with ID 1).
