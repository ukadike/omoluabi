/**
 * Deterministic preview for ssl.core.claim_verification.
 * This reports the applicable rule state; it does not determine truth.
 */
export function evaluateClaimVerification(check) {
  const evidence = Array.isArray(check?.evidence_assessments)
    ? check.evidence_assessments
    : [];
  const materialChallenge = evidence.some(
    (item) =>
      ["CHALLENGES", "CONFLICTS"].includes(item.relationship) &&
      item.material === true &&
      Boolean(item.evidence_ref)
  );
  const independentSupportingGroups = new Set(
    evidence
      .filter(
        (item) =>
          item.relationship === "SUPPORTS" &&
          item.independence_confirmed === true &&
          Boolean(item.evidence_ref) &&
          Boolean(item.source_ref) &&
          Boolean(item.source_chain_ref)
      )
      .map((item) => item.source_chain_ref)
  );

  if (materialChallenge) {
    return {
      rule_status: "DISPUTED",
      rule_ids: ["CLAIM.R004"],
      independent_supporting_groups: independentSupportingGroups.size,
      human_review_required: true,
    };
  }
  if (independentSupportingGroups.size >= 2) {
    return {
      rule_status: "READY_FOR_REVIEW",
      rule_ids: ["CLAIM.R003"],
      independent_supporting_groups: independentSupportingGroups.size,
      human_review_required: true,
    };
  }
  if (independentSupportingGroups.size === 1) {
    return {
      rule_status: "NEEDS_CORROBORATION",
      rule_ids: ["CLAIM.R002"],
      independent_supporting_groups: 1,
      human_review_required: true,
    };
  }
  return {
    rule_status: "UNSUPPORTED",
    rule_ids: ["CLAIM.R001"],
    independent_supporting_groups: 0,
    human_review_required: true,
  };
}

export const CLAIM_STATUS_VALUES = Object.freeze([
  "UNKNOWN",
  "UNSUPPORTED",
  "NEEDS_CORROBORATION",
  "READY_FOR_REVIEW",
  "CORROBORATED",
  "DISPUTED",
  "INVALIDATED",
]);
