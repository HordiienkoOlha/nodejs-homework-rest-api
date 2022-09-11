const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
const { RequestError } = require("../../helpers");

const updateAvatar = async (req, res) => {
  try {
    const { path: tmpUpload, filename } = req.file;
    const { _id } = req.user;
    const [extention] = filename.split(".").reverse();
    const avatarName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("avatars", resultUpload);

    await User.findByIdAndUpdate(_id, { avatarURL });
    if (!avatarURL) {
      RequestError(401, "Not authorized");
    }
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;

// const updateAvatar = async (req, res) => {
//   try {
//     const { path: tmpUpload, filename } = req.file;
//     const { _id } = req.user;
//     const [extention] = filename.split(".").reverse();
//     const avatarName = `${_id}.${extention}`;
//     const resultUpload = path.join(avatarsDir, avatarName);
//     await fs.rename(tmpUpload, resultUpload);
//     const avatarURL = path.join("avatars", resultUpload);
//     const resizeAvatar = Jimp.read(avatarURL)
//       .then((avatar) => {
//         return avatar.resize(250, 250).write(`${avatar}-small-bw.jpeg`);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//     await User.findByIdAndUpdate(_id, { avatar });
//     if (!avatar) {
//       RequestError(401, "Not authorized");
//     }
//     res.json({
//       avatar,
//     });
//   } catch (error) {
//     await fs.unlink(req.file.path);
//     throw error;
//   }
// };
// module.exports = updateAvatar;
