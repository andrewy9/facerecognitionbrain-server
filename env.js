import dotenv from 'dotenv'
export default dotenv.config({ silent: true })

console.log(process.env.TEST)