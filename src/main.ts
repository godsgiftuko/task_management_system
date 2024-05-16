import { configs } from 'config/config.env';
import { Bootstrap } from './bootstrap';

const app = new Bootstrap({
  serverPort: configs.SERVER_PORT,
  serverName: configs.SERVER_NAME,
});

app.init();
