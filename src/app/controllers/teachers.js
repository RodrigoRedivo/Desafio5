const Intl = require('intl')
const { age, graduation, date } = require('../../lib/utils')

module.exports = {
  index(req, res) {
    return res.render('teachers/index')
  },
  create(req, res) {
    return res.render('teachers/create')
  },
  show(req, res) {
    return res.render('teachers/show', { teacher })
  },
  post(req, res) {
    const keys = Object.keys(req.body) // CREATE ARRAY

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Error')
      }
    }

    return
  },
  edit(req, res) {
    return
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Error')
      }
    }
    return
  },
  delete(req, res) {
    return
  },
}