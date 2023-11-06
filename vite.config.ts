import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from "fs";
import https from 'https';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("F:/GetCoding/Backgammon/Certificate/key.pem"),
      cert: fs.readFileSync("F:/GetCoding/Backgammon/Certificate/cert.pem"),
    } as https.ServerOptions,
  },
  // base: '/Backgammon',
  plugins: [react()],
});

