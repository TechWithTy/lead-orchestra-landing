export async function GET() {
	return new Response(JSON.stringify({ ok: true, type: "standard-response" }), {
		headers: { "Content-Type": "application/json" },
	});
}
