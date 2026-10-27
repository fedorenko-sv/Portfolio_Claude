export async function POST() {
  // Do not parse or persist the request body until storage and operator are approved.
  return Response.json(
    {
      code: "LEADS_DISABLED",
      message: "Сбор заявок не подключён. Напишите Сергею напрямую в Telegram.",
    },
    { status: 503, headers: { "Cache-Control": "no-store" } },
  );
}
