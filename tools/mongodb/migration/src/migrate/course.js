import mongoose from 'mongoose';

const courseModel = mongoose.model('Course');
const courseV3Model = mongoose.model('CourseV3');
const userModel = mongoose.model('User');

const randomId = length => {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

export default async admin => {
  await courseV3Model.remove({});
  const courses = await courseModel.find({});
  await Promise.all(
    courses.map(async course => {
      const subscribers = (await userModel.find({
        $and: [
          {
            type: {
              $nin: [1, 2]
            }
          },
          {
            courses: course._id
          }
        ]
      })).map(user => user._id);
      await courseV3Model.create({
        _id: course._id,
        userId: admin,
        name: course.name,
        releaseDate: course.releaseDate,
        token: randomId(8),
        subscribers: subscribers
      });
    })
  );
  // eslint-disable-next-line no-console
  console.log('Finish Processing Course Collection');
};
