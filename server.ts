import { app } from './app'
import { sequelize } from './sequelize'


/* 
 * Base config 
 */

const port = 8004;


(async () => {
  /* 
   * Connect database
   */

  await sequelize.sync({
    alter: true,
    // force: true,
  })

  /* 
   * Listen port   
   */

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
    console.log(`Press CTRL-C to stop \n`)
  })
})()