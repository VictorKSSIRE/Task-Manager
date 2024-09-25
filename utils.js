import fs from 'fs/promises';

// appendFile()
const appendFile = async (info) => {
    try {
        await fs.appendFile('./logger.txt', `\n${info}`);
        console.log("Logger appended to");
    } catch (error) {
        console.log(error);
    }
};

export default appendFile;