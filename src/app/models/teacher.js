const {date} = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  all(callback) {
    db.query(`
      SELECT teachers.*, count(students) AS total_students
      FROM teachers 
      LEFT JOIN students ON (teachers.id = students.teacher_id)
      GROUP BY teachers.id
      ORDER BY total_students DESC`, function(err, respost) {
      if(err) throw `Database Error!${err}`

      callback(respost.rows)
    })
  },
  create(data, callback){
    const query = `
      INSERT INTO teachers (
        name,
        avatar_url,
        education_level,
        class_type,
        subjects_taught,
        birth_date,
        created_at
      )VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      date(data.birth_date).iso,
      date(Date.now()).iso
    ]

    db.query(query, values, function(err, respost) {
      if(err) throw `Database Error!${err}`

      callback(respost.rows[0])
    })
  },
  find(id, callback){
    db.query(`
      SELECT * 
      FROM teachers 
      WHERE id = $1`, [id], function(err, respost){
      if (err) throw `Database Error!${err}`

      callback(respost.rows[0])
    })
  },
  update(data, callback){
    const query = `
      UPDATE teachers SET 
        name=($1),
        avatar_url=($2),
        birth_date=($3),
        education_level=($4),
        class_type=($5),
        subjects_taught=($6)
      WHERE id = $7
    `

    const values = [
      data.name,
      data.avatar_url,
      date(data.birth_date).iso,
      data.education_level,
      data.class_type,
      data.subjects_taught,
      data.id
    ] 

    db.query(query, values, function(err, respost) {
      if (err) throw `Database Error!${err}`

      callback()
    })
  },
  delete(id, callback){
    db.query(`
      DELETE FROM teachers
      WHERE id = $1`, [id], function(err, respost) {
        if (err) throw `Database Error!${err}`
        return callback()
      })
  }
}