/**
 * Gemini AI Service
 * Uses Google Gemini 1.5 Flash (free tier) for all AI generation.
 * Requires VITE_GEMINI_API_KEY in .env
 */

const GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';


export async function callGemini(prompt) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'paste_your_key_here') {
        throw new Error(
            'Gemini API key not set. Open .env and replace paste_your_key_here with your key from aistudio.google.com'
        );
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 1024,
            },
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error('Empty response from Gemini. Try again.');

    return { response: text.trim() };
}
