const sharp = require('sharp');
const compress_images = require('compress-images');

let path = process.argv[2];
let width = Number(process.argv[3]);
let new_name = process.argv[4];

function resize(path, width, new_name) {
	let output_path = `./temp/${new_name}.jpg`;
	sharp(path)
		.resize(width)
		.toFile(output_path, (error) => {
			if (error) throw error;
			console.log(new_name);
			compress(output_path, `./compressed/`);
            
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

resize(path, width, new_name);
