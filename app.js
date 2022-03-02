const sharp = require('sharp');
const compress_images = require('compress-images');
const fs = require('fs');

let path = process.argv[2];
let width = Number(process.argv[3]);
let new_name = process.argv[4];
let rotate = Number(process.argv[5]);

function resize(path, width, new_name) {
	let output_path = `./temp/${new_name}.jpg`;
	let output_path_rotate = `./temp/${new_name}_${rotate}.jpg`;
	sharp(path)
		.resize(width)
		.toFile(output_path, (error) => {
			if (error) throw error;
			if (rotate) {
				sharp(output_path)
					.rotate(rotate)
					.toFile(output_path_rotate, (err) => {
						if (err) {
							throw error;
						}
						compress(output_path_rotate, `./compressed/`);
						delet(output_path_rotate);
					});
			} else if (!rotate) {
				compress(output_path, `./compressed/`);
			}

			delet(output_path);
		});
}

function compress(input_path, output_path) {
	compress_images(
		input_path,
		output_path,
		{ compress_force: false, statistic: true, autoupdate: true },
		false,
		{ jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
		{ png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
		{ svg: { engine: 'svgo', command: '--multipass' } },
		{
			gif: {
				engine: 'gifsicle',
				command: ['--colors', '64', '--use-col=web'],
			},
		},
		function (error, completed, statistic) {
			console.log('-------------');
			console.log(error);
			console.log(completed);
			console.log(statistic);
			console.log('-------------');
		}
	);
}

function delet(path) {
	setTimeout(() => {
		fs.unlink(path, (err) => {
			if (err) throw err;
		});
	}, 300);
}

resize(path, width, new_name);
