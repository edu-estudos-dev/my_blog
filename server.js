import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 3000;
app.listen(PORT, err => {
   if (err) throw err;
   console.log(`Server is running at address: http://localhost:${PORT}`);
});

