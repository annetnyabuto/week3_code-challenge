const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('db.json');

// Serve static files (images)
server.use('/images', jsonServer.defaults.static(path.join(__dirname, 'images')));

// Custom homepage to remove docs/sponsor links
server.get('/', (req, res) => {
  res.json({ message: 'Blog API Server' });
});

// Add CORS and other necessary middlewares manually
server.use(jsonServer.defaults({ noCors: false }));
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
  console.log(`Images served from http://localhost:${PORT}/images/`);
});