import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
    const allowedMimeTypes = ['application/pdf', 'video/mp4', 'video/quicktime'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Type de fichier non autorisé'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { 
        fileSize: 1024 * 1024 * 100 // 100Mo
    },
    fileFilter: fileFilter // Filtre les fichiers à uploader en fonction de leur type (seulement fichiers pdf et vidéos)
});

export default upload;