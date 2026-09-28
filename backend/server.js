const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/predict', upload.single('image'), (req, res) => {
  res.json({
    disease: 'Leaf Blight',
    confidence: '92%',
    solution: 'Use Neem Oil Spray'
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});