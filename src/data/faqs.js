const activeVersion = 'v3.3.3'

export const faqItems = [
  {
    question: 'What are Uniswap v4 Hooks?',
    answer:
      'Uniswap v4 hooks are external contracts that execute specific actions at certain points during the execution of a liquidity pool. These hooks enable developers to introduce added features and functionalities to liquidity pools in Uniswap v4.',
  },
  {
    question: 'What can Uniswap v4 hooks be used for?',
    answer:
      'Uniswap v4 hooks can execute large orders over time using TWAMM, implement on-chain limit orders, adjust fees dynamically, develop mechanisms against MEV, create custom oracle implementations, and even execute potentially malicious code. Users are advised to be cautious with which pools they interact.',
  },
  {
    question: 'How do I implement Uniswap v4 hooks in my project?',
    answer:
      'A developer can write a Solidity hook contract with custom logic. When setting up a liquidity pool on Uniswap v4, this hook contract can be specified to dictate the behavior of the pool at certain execution points.',
  },
  {
    question: 'Which hook callbacks are supported in Uniswap v4?',
    answer:
      'Uniswap v4 supports eight hook callbacks: beforeInitialize, afterInitialize, beforeModifyPosition, afterModifyPosition, beforeSwap, afterSwap, beforeDonate, and afterDonate.',
  },
  {
    question: 'Are Uniswap v4 hooks safe?',
    answer:
      "While hooks can introduce powerful functionalities, they can also execute malicious code. It's crucial for users to verify and trust the source of the hooks when interacting with pools.",
  },
  {
    question: 'How do Uniswap v4 hooks enhance liquidity pool features?',
    answer:
      'Hooks allow developers to customize how liquidity pools behave by introducing features like TWAMM, on-chain limit orders, and dynamic fee adjustments, among others.',
  },
  {
    question: 'Is there an official documentation for Uniswap v4 hooks?',
    answer:
      'Yes, developers are recommended to refer to the official Uniswap documentation to understand in-depth the functionalities and best practices for implementing v4 hooks.',
  },
  {
    question: 'How do I get support for Uniswap v4 hooks?',
    answer:
      'For queries or issues related to Uniswap v4 hooks, developers can refer to the official Uniswap channels or forums. Also, discussing with the broader Ethereum development community can be helpful.',
  },
  {
    question: 'How can I ensure the safety of my dApp users when using hooks?',
    answer:
      'Always conduct rigorous testing, preferably with third-party audits, before deploying hooks. Educate your users about the source and function of the hooks, ensuring transparency.',
  },
  {
    question: 'Can anyone add a hook to a Uniswap v4 liquidity pool?',
    answer:
      'While a developer can specify a hook when setting up a liquidity pool, users and liquidity providers should be cautious and ensure the safety and integrity of these hooks before interacting.',
  }
];
