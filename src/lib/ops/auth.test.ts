import { beforeEach, describe, expect, it } from "vitest";
import {
  DEMO_PASSCODE,
  DEMO_PASSCODE_FALLBACK,
  getSession,
  isAuthenticated,
  login,
  logout,
} from "./auth";

describe("Ops Auth Helper", () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it("is not authenticated initially", () => {
    expect(isAuthenticated()).toBe(false);
    expect(getSession()).toBeNull();
  });

  it("authenticates with standard demo passcode", () => {
    const res = login(DEMO_PASSCODE);
    expect(res.success).toBe(true);
    expect(isAuthenticated()).toBe(true);
    expect(getSession()?.staffName).toBe("Kave Reception");
  });

  it("authenticates with fallback passcode", () => {
    const res = login(DEMO_PASSCODE_FALLBACK);
    expect(res.success).toBe(true);
    expect(isAuthenticated()).toBe(true);
  });

  it("rejects invalid passcode", () => {
    const res = login("wrong-code");
    expect(res.success).toBe(false);
    expect(res.error).toBeDefined();
    expect(isAuthenticated()).toBe(false);
  });

  it("logs out and clears session", () => {
    login(DEMO_PASSCODE);
    expect(isAuthenticated()).toBe(true);
    logout();
    expect(isAuthenticated()).toBe(false);
  });
});
