export default {
  sendRespond: function(res, status = 200) {
    return function(data) {
      if (data == null) {
        return res.status(404).send({ status: 404, message: 'Data Not Found!' });
      } else {
        return res.status(status).send({ data: data });
      }
    }
  },

  checkDataNotFound: function(res) {
    return function(data) {
      if (data == null) {
        return res.status(404).send({ status: 404, message: 'Data Not Found!' });
      } else {
        return res.status(200).send({ data: data });
      }
    }
  },

  handleError: function(res) {
    return function(error) {
      if (error) {
        return res.status(400).send({ status: 400, message: error.message });
      }
    }
  }
}