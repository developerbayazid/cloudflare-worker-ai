import OpenAI from 'openai';

export const openaiClient = (env) =>
	new OpenAI({
		apiKey: env.OPENAI_API_KEY,
		baseURL: 'https://gateway.ai.cloudflare.com/v1/6ddd07315c2f56bf5599633f61557100/stock-predictions/openai',
		defaultHeaders: {
			'cf-aig-authorization': `Bearer ${env.CF_AI_GATEWAY_TOKEN}`,
		},
	});
