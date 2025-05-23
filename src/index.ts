import 'dotenv/config';
import 'module-alias/register';
import App from '@/app';
import controllers from '@/resources';

const app = new App(controllers);

app.listen();
