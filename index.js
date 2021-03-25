const sharp = require("sharp");
const progressive = require('is-progressive-jpeg');
var read = require('fs-readdir-recursive');
const fs = require('fs');
let args = process.argv.slice(2);
const dir = args.length == 0 ? './' : args[0]

read(dir).filter(function (file) {
    return file.substr(-4) === '.jpg';
}).forEach(async (e) => {
    let img = e.replace(`\\`, '/')
    let imgpath = `${dir}${img}`
    let image = progressive.setImage(imgpath)
    let isP = await image.isProgressive()
    if (isP) {
        const data = await sharp(imgpath)
            .jpeg({ quality: 100, progressive: false })
            .toBuffer();
        fs.writeFileSync(imgpath, data);
    }
});
console.log(`Done!`)