import { corsHeaders } from '../utils/cors';

export async function stockHandler(request, env) {
	try {
		const { tickers, startDate, endDate } = await request.json();

		if (!tickers || tickers.length === 0) {
			return new Response.json(
				{
					error: 'No tickers provided',
				},
				{
					status: 400,
					headers: corsHeaders,
				},
			);
		}

		if (!startDate || !endDate) {
			return new Response.json(
				{
					error: 'Start date or end date missing',
				},
				{
					status: 400,
					headers: corsHeaders,
				},
			);
		}

		const stockData = await Promise.all(
			tickers.map(async (ticker) => {
				const url = `https://api.massive.com/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${endDate}?apiKey=${env.POLYGON_API_KEY}`;

				const response = await fetch(url);

				if (!response.ok) {
					throw new Error(`Polygon error ${ticker}`);
				}

				return await response.json();
			}),
		);

		return new Response(JSON.stringify(stockData), { headers: corsHeaders });
	} catch (error) {
		return new Response.json(
			{
				error: 'Failed to fetch stock data',
			},
			{
				status: 500,
				headers: corsHeaders,
			},
		);
	}
}
