export const simulateAIGeneration = (prompt) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let responseText;
            if (prompt.includes("About Me")) {
                responseText = `🌟 Seasoned professional with over 10 years of experience driving growth in the tech industry.

🚀 Proven track record of leading cross-functional teams to deliver cutting-edge products ahead of schedule.

💡 Expert in Agile methodologies, cloud computing (AWS, Azure), and full-stack development (React, Node.js).

🤝 Passionate about mentoring junior developers and fostering a culture of innovation and continuous improvement.`;
            } else if (prompt.includes("headline suggestions")) {
                responseText = `Senior Software Engineer | Cloud-Native Applications & DevOps
Full-Stack Developer | FinTech & Blockchain Specialist
AI & Machine Learning Engineer | Python, TensorFlow, PyTorch
Product Manager | From Idea to Launch | SaaS & B2B
UX/UI Designer | Creating Intuitive & Beautiful User Experiences
Marketing Director | Driving Growth through Data-Driven Strategies`;
            } else if (prompt.includes("professional skills")) {
                responseText = `JavaScript, TypeScript, React, Node.js, Python, Go, SQL, MongoDB, PostgreSQL, Docker, Kubernetes, AWS, Google Cloud, CI/CD, Git, Agile Methodologies, Scrum, Product Management, UI/UX Design, Data Analysis, Machine Learning`;
            } else {
                responseText = "This is a simulated AI response. Please refine your prompt for a more specific answer.";
            }
            resolve({ response: responseText });
        }, 1200);
    });
};
