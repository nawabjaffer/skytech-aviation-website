export const modelConfig = {
  model: "gpt-3.5-turbo", // Specify the model to be used
  temperature: 0.7, // Controls the randomness of the output
  maxTokens: 150, // Maximum number of tokens to generate in the response
  topP: 1.0, // Controls the diversity of the output
  frequencyPenalty: 0, // Reduces the likelihood of repeated phrases
  presencePenalty: 0, // Increases the likelihood of new topics
  stopSequences: ["\n", "User:", "AI:"], // Sequences that will stop the generation
};