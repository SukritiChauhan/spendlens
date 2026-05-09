import { AITool } from '../types'

export const AI_TOOLS: AITool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    vendor: 'Anysphere',
    plans: [
      { id: 'cursor-hobby', name: 'Hobby', pricePerSeat: 0, bestFor: 'Individual, light use' },
      { id: 'cursor-pro', name: 'Pro', pricePerSeat: 20, bestFor: 'Individual, heavy coding use' },
      { id: 'cursor-business', name: 'Business', pricePerSeat: 40, bestFor: 'Teams of 5+' },
      { id: 'cursor-enterprise', name: 'Enterprise', pricePerSeat: 0, bestFor: 'Large orgs, custom pricing' },
    ],
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    vendor: 'GitHub',
    plans: [
      { id: 'copilot-individual', name: 'Individual', pricePerSeat: 10, bestFor: 'Solo developers' },
      { id: 'copilot-business', name: 'Business', pricePerSeat: 19, bestFor: 'Teams' },
      { id: 'copilot-enterprise', name: 'Enterprise', pricePerSeat: 39, bestFor: 'Large orgs with security needs' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    plans: [
      { id: 'claude-free', name: 'Free', pricePerSeat: 0, bestFor: 'Light personal use' },
      { id: 'claude-pro', name: 'Pro', pricePerSeat: 20, bestFor: 'Heavy individual use' },
      { id: 'claude-max', name: 'Max', pricePerSeat: 100, bestFor: 'Power users needing highest limits' },
      { id: 'claude-team', name: 'Team', pricePerSeat: 30, bestFor: 'Teams of 5+', minSeats: 5 },
      { id: 'claude-enterprise', name: 'Enterprise', pricePerSeat: 0, bestFor: 'Large orgs, custom pricing' },
      { id: 'claude-api', name: 'API Direct', pricePerSeat: 0, bestFor: 'Developers paying per token' },
    ],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    plans: [
      { id: 'chatgpt-plus', name: 'Plus', pricePerSeat: 20, bestFor: 'Heavy individual use' },
      { id: 'chatgpt-team', name: 'Team', pricePerSeat: 30, bestFor: 'Teams of 2+', minSeats: 2 },
      { id: 'chatgpt-enterprise', name: 'Enterprise', pricePerSeat: 0, bestFor: 'Large orgs, custom pricing' },
      { id: 'chatgpt-api', name: 'API Direct', pricePerSeat: 0, bestFor: 'Developers paying per token' },
    ],
  },
  {
    id: 'anthropic-api',
    name: 'Anthropic API',
    vendor: 'Anthropic',
    plans: [
      { id: 'anthropic-api-direct', name: 'API Direct', pricePerSeat: 0, bestFor: 'Pay per token — Claude models' },
    ],
  },
  {
    id: 'openai-api',
    name: 'OpenAI API',
    vendor: 'OpenAI',
    plans: [
      { id: 'openai-api-direct', name: 'API Direct', pricePerSeat: 0, bestFor: 'Pay per token — GPT models' },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    vendor: 'Google',
    plans: [
      { id: 'gemini-pro', name: 'Pro', pricePerSeat: 19.99, bestFor: 'Heavy individual use' },
      { id: 'gemini-ultra', name: 'Ultra', pricePerSeat: 249.99, bestFor: 'Power users needing highest limits' },
      { id: 'gemini-api', name: 'API', pricePerSeat: 0, bestFor: 'Developers paying per token' },
    ],
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    vendor: 'Codeium',
    plans: [
      { id: 'windsurf-free', name: 'Free', pricePerSeat: 0, bestFor: 'Individual, light use' },
      { id: 'windsurf-pro', name: 'Pro', pricePerSeat: 15, bestFor: 'Individual, heavy coding use' },
      { id: 'windsurf-teams', name: 'Teams', pricePerSeat: 30, bestFor: 'Teams of 2+' },
    ],
  },
]