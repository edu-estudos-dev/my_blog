import app from './app.js';
import { setupDatabase } from './database/connection.js';

import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;

// Inicia o banco de dados primeiro, depois o servidor
setupDatabase()
  .then(() => {
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`✅ Server running at: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });