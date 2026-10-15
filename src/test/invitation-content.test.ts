import { describe, expect, it } from "vitest";
import { calendarDays, invitation } from "@/lib/invitation-content";

describe("Editable wedding content", () => {
  it("places March 22, 2026 on Sunday", () => {
    const days = calendarDays(2026, 3);
    expect(days.length).toBe(31);
    expect(days.indexOf(22) % 7).toBe(0);
  });
  it("supports leap years", () => {
    expect(calendarDays(2028, 2).filter(Boolean)).toHaveLength(29);
  });
  it("keeps messages and accounts as editable data", () => {
    expect(invitation.families).toHaveLength(2);
    expect(invitation.letters).toHaveLength(2);
    expect(invitation.accounts).toHaveLength(6);
  });
});
