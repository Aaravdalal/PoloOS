module.exports = async function handler(req, res) {
  const prompt = req.query.prompt;
  if (!prompt) {
    return res.status(400).send("Missing prompt");
  }
  
  try {
    const aiRes = await fetch("https://text.pollinations.ai/prompt/" + encodeURIComponent(prompt));
    const aiText = await aiRes.text();
    res.status(200).send(aiText);
  } catch (e) {
    res.status(500).send("Error contacting AI");
  }
}
