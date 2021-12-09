import app from './app';
import './setup';

app.listen(process.env.PORT, () => {
  console.clear();
  console.log(`Env: ${process.env.NODE_ENV}`);
  console.log(`Server is running on port ${process.env.PORT}`);
});
