import { validateLesionData } from "../src/utils/data-schema.ts";
import example from "../demo/data/example-1.json" with { type: "json" };

Deno.test("validate example-1 has no critical warnings", () => {
  const res = validateLesionData(example as unknown);
  if (res.warnings.length > 0) {
    throw new Error("Validation produced warnings: " + res.warnings.join(", "));
  }
});
