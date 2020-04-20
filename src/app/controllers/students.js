const { date } = require('../../lib/utils')
const Student = require('../models/student')


module.exports = {
  index(req, res) {
    Student.all(function (students) {
      return res.render("students/index", { students })
    })
  },
  create(req, res) {
    return res.render('students/create')
  },
  show(req, res) {
    Student.find(req.params.id, function(student) {
      if (!student) return res.send("Student not found")

      student.birth_date = date(student.birth_date).birthDay 

      return res.render("students/show", { student })
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body) // CREATE ARRAY

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Error')
      }
    }

    Student.create(req.body, function (student) {
      return res.redirect(`students/${student.id}`)
    })
  },
  edit(req, res) {
    Student.find(req.params.id, function(student) {
      if (!student) return res.send("Student not found")

      student.birth_date = date(student.birth_date).iso 

      return res.render("students/edit", { student })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Error')
      }
    }
    
    Student.update(req.body, function() {

      return res.redirect(`/students/${req.body.id}`)
      
    })
  },
  delete(req, res) {
    Student.delete(req.body.id, function() {

      return res.redirect(`/students`)
    
    })
  },
}