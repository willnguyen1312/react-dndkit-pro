import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:5173");

  const button = page.getByRole("button", { name: "Drag me" });
  const container = page.getByText("Drop here B");
  expect(button).toBeVisible();
  expect(container).toBeVisible();

  await button.dragTo(container);
  expect(button).toHaveCount(0);
});
