export async function POST(req) {
  try {
    const body = await req.json();

    console.log("Nowe zamówienie:", body);

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}