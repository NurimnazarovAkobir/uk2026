export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, phone, email, region } = data;

    if (!name || !phone || !email || !region) {
      return new Response(JSON.stringify({ error: 'Barcha maydonlar toldirilishi kerak.' }), { status: 400 });
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      return new Response(JSON.stringify({ error: 'Google Apps Script URL sozlanmagan.' }), { status: 500 });
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phone, email, region })
    });

    const contentType = response.headers.get('content-type') || '';
    let result;

    if (contentType.includes('application/json')) {
      result = await response.json();
    } else {
      const text = await response.text();
      console.error('Unexpected response from Google Apps Script:', text.substring(0, 200));

      if (response.ok && text.trim() === 'Success') {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
      }

      return new Response(JSON.stringify({ error: 'Google Apps Script deployment xatosi. URL to\'g\'riligini tekshiring.' }), { status: 500 });
    }

    if (!response.ok) {
      return new Response(JSON.stringify({ error: result.error || 'Google Sheets xatosi' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Sheet submit error:', error);
    return new Response(JSON.stringify({ error: 'Server xatosi. Iltimos keyinroq urinib koring.' }), { status: 500 });
  }
}

