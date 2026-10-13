import { describe, expect, it } from "vitest";
import { calendarDays, invitation } from "@/lib/invitation-content";

describe("Editable wedding content", () => {
  it("places March 22, 2026 on Sunday", () => {
    const days = calendarDays(2026, 3);
    expect(days.length).toBe(31);
    expect(days.indexOf(22) % 7).toBe(0);
  });
  it("supports changed months and leap years", () => {
    expect(calendarDays(2028, 2).filter(Boolean)).toHaveLength(29);
    expect(calendarDays(2026, 4).filter(Boolean)).toHaveLength(30);
  });
  it("keeps the invitation messages as editable strings", () => {
    expect(invitation.families).toHaveLength(2);
    expect(invitation.letters).toHaveLength(2);
    expect(invitation.greeting).toContain("귀한 당신의 진심");
  });
});