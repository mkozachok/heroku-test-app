import mongoose from 'mongoose'

const create = (Model) => (data, callback) => {
  const created = Model(data);
  created.save(err => {
    if (err) throw err;
    if (callback) {
      callback(created);
    }
  });
};

const getById = (Model) => (id, callback) => {
  const isValid = mongoose.Types.ObjectId.isValid(id)
  if (!isValid) {
    throw new Error('Invalid id')
  }
  Model.findById(id).exec((err, item) => {
    if (err) throw err;
    callback(item);
  })
};

const getAll = (Model) => (callback) => {
  Model.find({}, (err, items) => {
    if (err) throw err;
    callback(items);
  });
};


const update = (Model) => (data, callback) => {
  const {_id, ...values} = data;
  Model.findById(_id, (err, item) => {
    if (err) throw err;
    const updatedItem = {...item, ...values};
    updatedItem.save(function(err) {
      if (err) throw err;
      callback(updatedItem);
    });
  });
};

const remove = (Model) => (id, callback) => {
  Model.findByIdAndRemove(id, err => {
    if (err) throw err;
    callback();
  });
};

// TODO: find better name
export const createCommonCtrl = (Model) => ({
  get: getById(Model),
  getAll: getAll(Model),
  create: create(Model),
  update: update(Model),
  remove: remove(Model),
})
