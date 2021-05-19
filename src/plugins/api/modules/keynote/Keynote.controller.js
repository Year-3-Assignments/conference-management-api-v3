import Keynote from './Keynote.model';
import response from '../../../../lib/response.handler';

//create new keynote - core
export async function createKeynote (req, res, next){
  if (req.body) {
    let keynote = new Keynote(req.body);
    await keynote.save()
    .then(() => {
      response.sendRespond(res, keynote);
      next();
    })
    .catch(error => {
      response.handleError(res, error.message);
      next();
    });
  }
}

//get all keynote details
export async function getAllKeynotes(req, res, next) {
  await Keynote.find({})
  .populate('', '')
  .populate('', '')
  .then((data) => {
    response.sendRespond(res, data);
    next();
  })
  .catch(error => {
    response.handleError(res, error.message);
    next();
  });
}

//get keynote details - core
export function getKeynoteById(req, res, next) {
  if (req.keynote) {
    response.sendRespond(res, req.keynote);
    next();
  } else {
    response.sendNotFound(res);
  }
}

// update user - core
export async function updateKeynote(req, res, next) {
  if (req.body) {
    let updateData = {
      title: req.body.title,
      keynoteimageurl: req.body.keynoteimageurl,
      conforenceid: req.body.conforenceid
    };
    const keynote = await keynote.findByIdAndUpdate(req.user.id, updateData);
    response.sendRespond(res, keynote);
    next();
  } else {
    response.handleError(res, 'Please provide necessary fields');
  }
}

// delete keynote - core
export async function deleteKeynote(req, res, next) {
  if (req.params && req.params.id) {
    const keynote = await Keynote.findIdAndDelete(req.keynote.id);
    response.sendRespond(res, keynote);
    next();
  } else {
    response.handleError(req, 'Parameter id is required');
    next();
  }
}






