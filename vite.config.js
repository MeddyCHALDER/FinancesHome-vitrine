import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

// Le site est un ensemble de pages HTML statiques (dossier site/).
// Vite ne sert qu'au serveur de dev ; le build copie site/ tel quel (tools/build.mjs).
// En dev, /api/form(.php) est routé vers la fonction Vercel api/form.js.
function formApiDev() {
	return {
		name: 'financeshome-form-api',
		configureServer(server) {
			Object.assign(process.env, loadEnv('development', process.cwd(), ''));
			server.middlewares.use(async (req, res, next) => {
				if (!/^\/api\/form(\.php)?$/.test(req.url.split('?')[0])) return next();
				let raw = '';
				for await (const chunk of req) raw += chunk;
				req.body = raw;
				res.status = (code) => { res.statusCode = code; return res; };
				res.json = (payload) => {
					res.setHeader('Content-Type', 'application/json; charset=utf-8');
					res.end(JSON.stringify(payload));
				};
				const { default: handler } = await server.ssrLoadModule(path.resolve('api/form.js'));
				await handler(req, res);
			});
		},
	};
}

export default defineConfig({
	root: 'site',
	plugins: [formApiDev()],
});
