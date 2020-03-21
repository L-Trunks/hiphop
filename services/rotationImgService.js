import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import ROTATIONIMGMODEL from '../model/danceRotationImgModel'
//添加图片
function addRotationImg(rotationImgData, callback) {
    CONNECT.connect().then(res => {
        ROTATIONIMGMODEL.find(rotationImgData, (err, data) => {
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                if (data == 0) {
                    const danceRotationImg = new ROTATIONIMGMODEL(rotationImgData);
                    danceRotationImg.save((err, data, numAffected) => {
                        if (err) {
                            callback(err, data)
                            //数据库异常
                        } else {
                            //保存成功
                            callback(err, data[0])
                        }
                    });
                } else {
                    console.log(data)
                    callback(err, errorNumber.ROTATION_IMG_ALREADY())

                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, {desc:'链接数据库失败'})
    })

}

//删除图片
function deleteRotationImg(rotationImgData, callback) {
    CONNECT.connect().then(res => {
        ROTATIONIMGMODEL.remove(rotationImgData, (err, data) => {
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                console.log(data)
                callback(err, data)
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, {desc:'链接数据库失败'})
    })

}

//修改图片
function updateRotationImg(rotationImgData, callback) {
    CONNECT.connect().then(res => {
        ROTATIONIMGMODEL.update({ _id: rotationImgData['_id'] }, { $set: rotationImgData }, (err, data) => {
            if (err) {
                callback(err, data)
                //抛出异常
            } else {
                console.log(data)
                callback(err, data)
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, {desc:'链接数据库失败'})
    })

}

//查询图片

function selectRotationImg(rotationImgData, callback) {
    CONNECT.connect().then(res => {
        ROTATIONIMGMODEL.find(rotationImgData).aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "userid",
                    foreignField: "_id",
                    as: "rotationImgUser"
                }
            }], (err, data) => {
                if (err) {
                    callback(err, data)
                    //抛出异常
                } else {
                    console.log(data)
                    callback(err, data)
                }
            });
    }).catch(err => {
        console.log(err)
        callback(err, {desc:'链接数据库失败'})
    })

}

module.exports = {
    addRotationImg: addRotationImg,
    deleteRotationImg: deleteRotationImg,
    updateRotationImg: updateRotationImg,
    selectRotationImg: selectRotationImg
}