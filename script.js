import fs from 'fs';

fs.readFile('./hello.txt', (err, data) => {
  if (err) {
    console.log('error');
  }
  console.log('Async', data.toString(`utf8`));
  //.toString() by default is utf8
})

const file = fs.readFileSync('./hello.txt');
console.log('Sync', file.toString());

//APPEND
// fs.appendFile('./hello.txt', 'This is so cool', err => {
//   if (err) {
//     console.log(err)
//   }
// })

//WRITE
// fs.writeFile('bye.txt', 'Sad to see you go', err => {
//   if (err) {
//     console.log(err)
//   }
// })

//DELTE
fs.unlink('./bye.txt', err => {
  if (err) {
    console.log(err)
  }
  console.log('Inception')
})