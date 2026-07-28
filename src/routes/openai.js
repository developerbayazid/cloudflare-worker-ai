import { openaiClient } from '../services/openai';
import { corsHeaders } from '../utils/cors';

export async function reportHandler(request, env) {
	// Only process post request
	if (request.method != 'POST') {
		return new Response(JSON.stringify(`${request.method} Method not allowed`), { status: 405, headers: corsHeaders });
	}

	const messages = await request.json();

	const openai = openaiClient(env);

	try {
		const response = await openai.responses.create({
			model: 'gpt-5-nano',
			reasoning: {
				effort: 'low',
			},
			input: messages,
		});
		return new Response(JSON.stringify(response.output_text), { headers: corsHeaders });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
	}
}
