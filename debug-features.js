
async function testEndpoint(name, url, payload) {
    console.log(`\n--- Testing ${name} ---`);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const status = response.status;
        console.log(`Status: ${status}`);

        let data;
        const text = await response.text();
        try {
            data = JSON.parse(text);
            console.log("Response Data Preview:", JSON.stringify(data).substring(0, 200) + "...");
        } catch (e) {
            console.log("Response Text:", text);
        }

        if (status !== 200) {
            console.error(`FAILED: ${name} returned ${status}`);
        } else {
            console.log(`SUCCESS: ${name} working`);
        }
    } catch (error) {
        console.error(`ERROR: ${name} failed with network error:`, error.message);
    }
}

async function run() {
    const baseUrl = 'http://localhost:3000';

    // 1. Hook Engine
    await testEndpoint('Hook Engine', `${baseUrl}/api/analyze-hook`, {
        hook: "This one trick changed my career forever."
    });

    // 2. Comment Engine
    await new Promise(r => setTimeout(r, 5000));
    await testEndpoint('Comment Engine', `${baseUrl}/api/generate-comment`, {
        postContent: "Just launched my new project! #coding #launch",
        postAuthor: "Aaditya"
    });

    // 3. Repurposing Engine
    await new Promise(r => setTimeout(r, 5000));
    await testEndpoint('Repurpose Engine', `${baseUrl}/api/repurpose`, {
        sourceText: "Long form content about the future of AI and how it impacts coding..."
    });
}

run();
