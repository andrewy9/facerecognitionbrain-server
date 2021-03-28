export const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        return res.status(200).json(user[0])
      }
      return res.status(400).json('user not found')
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json('error getting use')
    })
}