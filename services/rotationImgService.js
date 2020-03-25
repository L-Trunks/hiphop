import CONNECT from '../mongo/dbase'
import errorNumber from '../config/errorNum'
import ROTATIONIMGMODEL from '../model/rotationImgModel'
import mongoose from 'mongoose';
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
                        mongoose.disconnect()
                        if (err) {
                            callback(err, data)
                            //数据库异常
                        } else {
                            //保存成功
                            callback(err, data)
                        }
                    });
                } else {
                    mongoose.disconnect()
                    console.log(data)
                    callback(err, errorNumber.ROTATION_IMG_ALREADY())

                }
            }
        });
    }).catch(err => {
        console.log(err)
        callback(err, { desc: '链接数据库失败' })
    })

}

//删除图片
function deleteRotationImg(rotationImgData, callback) {
    CONNECT.connect().then(res => {
        ROTATIONIMGMODEL.remove(rotationImgData, (err, data) => {
            mongoose.disconnect()
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
        callback(err, { desc: '链接数据库失败' })
    })

}

//修改图片
function updateRotationImg(rotationImgData, callback) {
    CONNECT.connect().then(res => {
        ROTATIONIMGMODEL.update({ _id: rotationImgData['_id'] }, { $set: rotationImgData }, (err, data) => {
            mongoose.disconnect()
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
        callback(err, { desc: '链接数据库失败' })
    })

}

//查询图片

function selectRotationImg(rotationImgData, callback) {
    CONNECT.connect().then(res => {
        ROTATIONIMGMODEL.aggregate([
            {
                $match: rotationImgData
            },
            {
                $lookup: {
                    from: "user",
                    localField: "userid",
                    foreignField: "_id",
                    as: "rotationImgUser"
                }
            }], (err, data) => {
                mongoose.disconnect()
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
        callback(err, { desc: '链接数据库失败' })
    })

}

//更新图片状态
function updatImgstatus(rotationImgData, callback) {
    CONNECT.connect().then(res => {
        ROTATIONIMGMODEL.update({ _id: { $in: rotationImgData[imgIdArr] } }, { $set: { status: rotationImgData.status } }, false, true, (err, data) => {
            mongoose.disconnect()
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
        callback(err, { desc: '链接数据库失败' })
    })

}

module.exports = {
    addRotationImg: addRotationImg,
    deleteRotationImg: deleteRotationImg,
    updateRotationImg: updateRotationImg,
    selectRotationImg: selectRotationImg,
    updatImgstatus:updatImgstatus
}