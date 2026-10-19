export type LlmProvider = "openai" | "anthropic";

export interface LlmConfig {
  provider: LlmProvider;
  apiKey: string;
  model: string;
}

export function getLlmConfig(): LlmConfig {
  const provider = (process.env.LLM_PROVIDER ?? "openai").toLowerCase();

  if (provider === "anthropic") {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        "ANTHROPIC_API_KEY não configurada. Defina no arquivo .env.local.",
      );
    }
    return {
      provider: "anthropic",
      apiKey,
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514",
    };
  }

  if (provider !== "openai") {
    throw new Error(
      `LLM_PROVIDER inválido: "${provider}". Use "openai" ou "anthropic".`,
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY não configurada. Defina no arquivo .env.local.",
    );
  }

  return {
    provider: "openai",
    apiKey,
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  };
}
