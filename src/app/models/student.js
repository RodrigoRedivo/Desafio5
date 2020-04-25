const {grade,date} = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  all(callback) {
    db.query(`
      SELECT * FROM students 
      ORDER BY name ASC`, function(err, respost) {
      if(err) throw `Database Error!${err}`

      callback(respost.rows)
    })
  },
  create(data, callback){
    const query = `
      INSERT INTO students (
        name,
        avatar_url,
        email,
        birth_date,
        schoolyear,
        workload
      )VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      data.email,
      date(data.birth_date).iso,
      data.schoolyear,
      data.workload
    ]

    db.query(query, values, function(err, respost) {
      if(err) throw `Database Error!${err}`

      callback(respost.rows[0])
    })
  },
  find(id, callback){
    db.query(`
      SELECT * 
      FROM students 
      WHERE id = $1`, [id], function(err, respost){
      if (err) throw `Database Error!${err}`

      callback(respost.rows[0])
    })
  },
  update(data, callback){
    const query = `
      UPDATE students SET 
        name=($1),
        avatar_url=($2),
        email=($3),
        birth_date=($4),
        schoolyear=($5),
        workload=($6)
      WHERE id = $7
    `

    const values = [
      data.name,
      data.avatar_url,
      data.email,
      date(data.birth_date).iso,
      data.schoolyear,
      data.workload,
      data.id
    ] 

    db.query(query, values, function(err, respost) {
      if (err) throw `Database Error!${err}`

      callback()
    })
  },
  delete(id, callback){
    db.query(`
      DELETE FROM students
      WHERE id = $1`, [id], function(err, respost) {
        if (err) throw `Database Error!${err}`
        return callback()
      })
  },
  teachersSelectOptions(callback) {
    db.query(`SELECT name, id FROM  teachers`, function(err, respost){
      if(err) throw`Databse Error! ${err}`

      callback(respost.rows)
    })
  }
}