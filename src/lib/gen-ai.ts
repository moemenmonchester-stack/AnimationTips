'use server';

// A real app would have this in a .env file
const API_KEY = process.env.GEMINI_API_KEY;

export async function callGenAI(prompt: string): Promise<string> {
    if (!API_KEY) {
        console.error("Missing GEMINI_API_KEY");
        // Simulate a delay and return a predefined response for local development
        await new Promise(resolve => setTimeout(resolve, 1000));
        return `مرحباً! يبدو أن مفتاح الواجهة البرمجية (API Key) غير متوفر. هذا هو رد افتراضي لأغراض العرض. في تطبيق حقيقي، سيتم هنا عرض إجابة من الذكاء الاصطناعي.`;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`API request failed with status ${response.status}: ${errorBody}`);
            throw new Error(`API request failed with status ${response.status}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            return candidate.content.parts[0].text;
        } else {
            console.error('Invalid response structure from API:', result);
            throw new Error('Invalid response structure from API.');
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        throw error;
    }
}
