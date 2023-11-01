const express = require('express');
const app = express();
const cors = require('cors');
const videoRoutes = require('./routes/videoRoutes');
const trackRoutes = require('./routes/trackRoutes');

app.use(cors());
app.use(express.json());
app.use(videoRoutes);
app.use(trackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
