const express = require('express');
const cors = require('cors');
const phonebookRoutes = require('./routes/phonebook');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/phonebook', phonebookRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
