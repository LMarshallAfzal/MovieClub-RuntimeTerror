import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "/api/test/fixtures/default_user";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeUser = {
    username: "johndoe",
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.org",
    bio: "Hello, I am John Doe.",
    preferences: "Action, Horror",
    password: "Password123!"
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<User id="1" />, container);
  });

  
  expect(container.querySelector("h1").textContent).toBe(fakeUser.username)
  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});