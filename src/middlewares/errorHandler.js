export function errorHandler(err, req, res, next) {
	console.error(err.stack);
	const status = err.status || 500;
	res.status(status).json({ error: err.message || 'Erro interno do servidor' });
}
