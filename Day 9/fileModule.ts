import * as fs from "fs";

interface DetailType {
	name: string;
	company: string;
}

const FILE_PATH = "./dist/data.json";
const initialValue: DetailType[] = [
	{ name: "Daksh Lohar", company: "Wisflux Private Limited!" },
];

enum FILE_MODE {
	READ = "r",
	WRITE = "w",
	APPEND = "a",
}

const checkFileExists = async (file: string): Promise<boolean> => {
	try {
		await fs.promises.access(file, fs.constants.F_OK);
		return true;
	} catch (e) {
		return false;
	}
};

async function fillInitialDataIfFileNotExist(): Promise<void> {
	fs.appendFile(FILE_PATH, JSON.stringify(initialValue), (err) => {
		console.log(err);
	});
	return;
}

async function main() {
	const isFileExist = await checkFileExists(FILE_PATH);
	if (isFileExist) {
		fs.readFile(FILE_PATH, "utf-8", (err, data: Buffer | string) => {
			if (err) {
				console.log(err);
			}
			const newDetail: DetailType = {
				name: "D",
				company: "Wisflux",
			};
			const parsedData = JSON.parse(data as unknown as string);
			const appendedData = [...parsedData, newDetail];
			fs.writeFile(FILE_PATH, JSON.stringify(appendedData), (err) => {
				console.log(err);
			});
		});
	} else {
		fillInitialDataIfFileNotExist();
	}
}

main();