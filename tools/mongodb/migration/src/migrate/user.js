import mongoose from 'mongoose';

const userModel = mongoose.model('User');
const userV3Model = mongoose.model('UserV3');

export default async admin => {
  await userV3Model.remove({});
  const users = await userModel.find({
    $and: [
      {
        type: {
          $nin: [1, 2]
        }
      },
      {
        courses: {
          $not: {
            $size: 0
          }
        }
      }
    ]
  });
  await Promise.all(
    users.map(async user => {
      await userV3Model.create({
        _id: user._id,
        type: user.type,
        school: user.school
      });
    })
  );
  // create the only admin account
  await userV3Model.create({
    _id: admin,
    type: 2,
    school: 0
  });
  console.log('Finish Processing User Collection');
};
