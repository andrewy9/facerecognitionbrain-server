export const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('form needs to be completed')
  }
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*')
          .from('users')
          .where('email', '=', email)
          .then(user => {
            return res.status(200).json(user[0])
          })
          .catch(error => {
            console.log(error)
            return res.status(400).json('unable to to get user')
          })
      } return res.status(400).json('wrong credentials')
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json('wrong credentials')
    })
}