export default defineEventHandler((event) => {
	// ignore health check and auth routes
	const url = event.node.req.url || "";
	if (
		!url.startsWith("/api") ||
		[
			"/api/health",
			"/api/auth/login",
			"/api/auth/signup",
			"/api/auth/refresh",
		].includes(url)
	)
		return;

	const authHeader = getHeader(event, "authorization");

	if (!authHeader) {
		throw createError({ statusCode: 401, message: "No token provided" });
	}

	try {
		const token = authHeader.split(" ")[1];

		const userId = decodeToken(token);
		event.context.userId = userId;
	} catch (_error) {
		throw createError({ statusCode: 401, message: "Invalid token" });
	}
});
