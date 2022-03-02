const sharp = require('sharp');

let path = process.argv[2];
let width = Number(process.argv[3]);
let new_name = process.argv[4];

function resize(path, width, new_name) {
	sharp(path)
		.resize(width)
		.toFile(`./temp/${new_name}.jpg`, (error) => {
			if (error) throw error;
		});
}

resize(path, width, new_name);
