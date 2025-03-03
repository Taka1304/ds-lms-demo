import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import localFont from "next/font/local";
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from "react";

const notoSans = localFont({
  src: "./fonts/NotoSansJP-Medium.ttf",
  variable: "--font-noto-sans-jp",
  weight: "400 700",
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`${notoSans.variable} antialiased`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
