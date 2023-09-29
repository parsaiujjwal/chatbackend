import path from 'path';

export const getImage = async (req, res) => {
    const thumbnail = req.params.thumbnail;
    const myPath = path.resolve(process.cwd(), "public",thumbnail);
    res.sendFile(myPath);
};
