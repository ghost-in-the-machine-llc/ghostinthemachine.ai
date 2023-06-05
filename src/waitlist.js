const form = document.querySelector('form');
const messageDisplay = document.getElementById(
    'message-display'
);

function updateMessage(message = '') {
    messageDisplay.textContent = message;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    updateMessage();

    const formData = new FormData(form);
    const email = formData.get('email');

    try {
        await addToWaitList(email);
        updateMessage(`You've been added to the waitlist!`);
        form.elements.email.blur();
        form.reset();
    } catch (e) {
        if (e.message === DUPLICATE_EMAIL) {
            updateMessage(
                `${email} is already on the waitlist.`
            );
        } else {
            // eslint-disable-next-line no-console
            console.log(e);
            updateMessage(
                `Unexpected error, please try again later.`
            );
        }
    }
});

const WAITLIST_URL =
    'https://zekxhqiqlnzydflpmddi.supabase.co/rest/v1/waitlist';
const API_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpla3hocWlxbG56eWRmbHBtZGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5MTg3OTMsImV4cCI6MjAwMTQ5NDc5M30.ON3_y07S6C1hZfmLoz1GdsmCuaiTkEnffDnIFsYAUbA';
const DUPLICATE_EMAIL = 'DUPLICATE_EMAIL';

async function addToWaitList(email) {
    const r = await fetch(WAITLIST_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            apikey: API_KEY,
            // Prefer: 'return=representation',
        },
        body: JSON.stringify({ email }),
    });

    if (!r.ok) {
        const body = await r.json();
        throw r.status === 409 && body.code === '23505'
            ? new Error(DUPLICATE_EMAIL)
            : body;
    }

    return null;
}
