import { createApp } from './app';

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Good Friend is listening on port ${PORT}`);
  console.log('Promoting positive mental health, tolerance, and peace.');
});
