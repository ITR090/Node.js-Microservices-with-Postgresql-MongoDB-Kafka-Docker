const { MailtrapClient } = require('mailtrap');

const client = new MailtrapClient({
    token: process.env.MAILTRAP_API_KEY,
    testInboxId: 4611328,
    sandbox: true,
});

function isValidEmail(value) {
    if (typeof value !== 'string') return false;
    const v = value.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

exports.sendEmail = async () => {
    try {
        const fromEmail = (process.env.MAILTRAP_FROM_EMAIL || "no-reply@demomailtrap.com").trim();
        const fromName = (process.env.MAILTRAP_FROM_NAME || "Delivery App").trim();

        if (!isValidEmail(fromEmail)) {
            throw new Error(
                `Invalid MAILTRAP_FROM_EMAIL "${fromEmail}". Expected something like "no-reply@yourdomain.com".`
            );
        }

        const response = await client.send({
            from: { email: fromEmail, name: fromName },
            to: [{ email: "raghad.4309@gmail.com" }],
            subject: "Test Email",
            text: "Test email",
        });

        console.log("successfully sent email:");
    } catch (error) {
        console.error("Mailtrap error:", error);
    }
};