import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";

test("App component test", () => {
  render(<App />);

  expect(screen.getByRole("button", { name: "Drag me" })).toBeDefined();
});
