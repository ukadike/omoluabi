import test from "node:test";
import assert from "node:assert/strict";
import { evaluateClaimVerification } from "./claim-verification.mjs";

test("no supporting sources remain unsupported, not false", () => {
  const result = evaluateClaimVerification({ evidence_assessments: [] });
  assert.equal(result.rule_status, "UNSUPPORTED");
  assert.equal(result.rule_ids[0], "CLAIM.R001");
  assert.equal(result.human_review_required, true);
});

test("one confirmed source chain needs corroboration", () => {
  const result = evaluateClaimVerification({
    evidence_assessments: [
      { relationship: "SUPPORTS", evidence_ref: "e1", source_ref: "s1", source_chain_ref: "chain-a", independence_confirmed: true },
      { relationship: "SUPPORTS", evidence_ref: "e2", source_ref: "s2", source_chain_ref: "chain-a", independence_confirmed: true },
    ],
  });
  assert.equal(result.rule_status, "NEEDS_CORROBORATION");
  assert.equal(result.independent_supporting_groups, 1);
});

test("two explicitly independent support chains reach review, not corroboration", () => {
  const result = evaluateClaimVerification({
    evidence_assessments: [
      { relationship: "SUPPORTS", evidence_ref: "e1", source_ref: "s1", source_chain_ref: "chain-a", independence_confirmed: true },
      { relationship: "SUPPORTS", evidence_ref: "e2", source_ref: "s2", source_chain_ref: "chain-b", independence_confirmed: true },
    ],
  });
  assert.equal(result.rule_status, "READY_FOR_REVIEW");
  assert.equal(result.rule_ids[0], "CLAIM.R003");
  assert.notEqual(result.rule_status, "CORROBORATED");
});

test("a material challenge takes precedence over source count", () => {
  const result = evaluateClaimVerification({
    evidence_assessments: [
      { relationship: "SUPPORTS", evidence_ref: "e1", source_ref: "s1", source_chain_ref: "chain-a", independence_confirmed: true },
      { relationship: "SUPPORTS", evidence_ref: "e2", source_ref: "s2", source_chain_ref: "chain-b", independence_confirmed: true },
      { relationship: "CHALLENGES", evidence_ref: "e3", material: true },
    ],
  });
  assert.equal(result.rule_status, "DISPUTED");
  assert.equal(result.rule_ids[0], "CLAIM.R004");
});

test("unconfirmed independence is not counted", () => {
  const result = evaluateClaimVerification({
    evidence_assessments: [
      { relationship: "SUPPORTS", evidence_ref: "e1", source_ref: "s1", source_chain_ref: "chain-a", independence_confirmed: false },
    ],
  });
  assert.equal(result.rule_status, "UNSUPPORTED");
});
