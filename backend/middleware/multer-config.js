const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

const storage = multer.diskStorage({
    // désignation du fichier de destination des images ajoutées
    destination: (req, file, callback) => {
        callback(null, './images'); 
    },
    filename: (req, file, callback) => {
        // suppression des espaces et remplace par '_' dans le nom du fichier original
        const name = file.originalname.split(' ').join('_'); 
        // création de l'extension sur fichier
        const extension = MIME_TYPES[file.mimetype]; 
        // on appelle la fonction pour renommer entièrement le fichier image nom, date et extension
        callback(null, name + Date.now() + '.' + extension); 
    }
});

// exporation de l'élément multer + constante storage + gestion des téléchargements uniquement
module.exports = multer({storage: storage}).single('image'); 