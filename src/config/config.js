

// ========================
// Port 
// ========================
process.env.PORT = process.env.PORT || 3000;

// ========================
// Enviroment
// ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ========================
//  Expiration token
// ========================
// 60 seg * 60 min * 24hs * 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ========================
// authentication SEED
// ========================
process.env.SEED = process.env.SEED || 'seed-de-desarrollo';

// ========================
// Database
// ========================
let urlDB;

if ( process.env.NODE_ENV === 'dev' ) {
    urlDB = 'mongodb://localhost/companydb';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;