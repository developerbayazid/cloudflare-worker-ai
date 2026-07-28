import { reportHandler } from './routes/openai';
import { stockHandler } from './routes/polygon';
import { corsHeaders } from './utils/cors';

export default {
	async fetch(request, env, ctx) {
		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		if (request.method != 'POST') {
			return new Response(JSON.stringify(`${request.method} not allowed!`));
		}

		const url = new URL(request.url);

		// Stock api endpoint
		try {
			if (url.pathname === '/stock') {
				return await stockHandler(request, env);
			}
		} catch (error) {
			return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
		}

		// Report api endpoint
		try {
			if (url.pathname === '/report') {
				return await reportHandler(request, env);
			}
		} catch (error) {
			return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
		}

		return new Response.json({ message: 'AI Worker Running' }, { headers: corsHeaders });
	},
};
