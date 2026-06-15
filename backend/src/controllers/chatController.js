const { chatResponse } = require("../services/aiService");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const reply = await chatResponse(message);

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to get AI response",
    });
  }
};

module.exports = { chatWithAI };
