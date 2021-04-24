import databaseUtil from '../../../../lib/database.config';
let database = databaseUtil.getDatabase();

export function createUser(req, res, next) {
  try {
    database.collection('users').insertOne(req.body)
    .then((data) => {
      res.status(200).send({ message: 'DATA INSERTED', data: data.ops[0] });
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ error: error.message });
  }
}
