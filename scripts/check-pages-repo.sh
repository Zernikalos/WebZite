#!/usr/bin/env bash
# Preflight for Deploy: verify PERSONAL_TOKEN can read and push to the
# GitHub Pages repository before spending CI time on install/build.
set -euo pipefail

REPO="${PAGES_REPO:-Zernikalos/zernikalos.github.io}"
BRANCH="${PAGES_BRANCH:-gh-pages}"

error() {
  echo "::error::$1"
  echo "ERROR: $1" >&2
  exit 1
}

warn() {
  echo "::warning::$1"
  echo "WARNING: $1" >&2
}

if [[ -z "${GH_TOKEN:-}" ]]; then
  error "PERSONAL_TOKEN is empty. Add a PAT with Contents: Write on ${REPO} (authorize org SSO if required) as the PERSONAL_TOKEN secret."
fi

auth_err="$(mktemp)"
access_err="$(mktemp)"
perm_err="$(mktemp)"
ref_err="$(mktemp)"
cleanup() {
  rm -f "${auth_err}" "${access_err}" "${perm_err}" "${ref_err}"
}
trap cleanup EXIT

echo "Checking GitHub authentication..."
login="unknown"
if login="$(gh api user --jq .login 2>"${auth_err}")"; then
  echo "Authenticated as ${login}"
else
  warn "Could not read the token owner from /user (common with fine-grained PATs). Continuing with repository checks."
  login="unknown"
fi

echo "Checking access to ${REPO}..."
if ! repo_json="$(gh api "repos/${REPO}" --jq '{full_name: .full_name, archived: .archived, permissions: .permissions}' 2>"${access_err}")"; then
  err_body="$(cat "${access_err}" 2>/dev/null || true)"
  if echo "${err_body}" | grep -Eqi 'SSO|SAML|saml'; then
    error "Token cannot access ${REPO} because GitHub org SSO is not authorized for this token. Authorize SSO for the Zernikalos org, then retry."
  fi
  if echo "${err_body}" | grep -Eqi 'Bad credentials|401'; then
    error "PERSONAL_TOKEN is invalid or expired. GitHub rejected the credentials. ${err_body}"
  fi
  error "Cannot access ${REPO}. Check that PERSONAL_TOKEN has access to that repository. ${err_body}"
fi

full_name="$(echo "${repo_json}" | jq -r .full_name)"
archived="$(echo "${repo_json}" | jq -r .archived)"
can_push="$(echo "${repo_json}" | jq -r '.permissions.push // empty')"
echo "Repository: ${full_name}"
echo "Permissions: $(echo "${repo_json}" | jq -c .permissions)"

if [[ "${archived}" == "true" ]]; then
  error "${REPO} is archived; cannot create a deploy commit."
fi

if [[ -z "${can_push}" ]]; then
  echo "Repo payload did not include permissions.push; checking collaborator permission..."
  if [[ "${login}" == "unknown" ]]; then
    error "Cannot confirm write access to ${REPO}: the token payload omitted permissions.push and /user is unavailable."
  fi
  if ! perm="$(gh api "repos/${REPO}/collaborators/${login}/permission" --jq .permission 2>"${perm_err}")"; then
    err_body="$(cat "${perm_err}" 2>/dev/null || true)"
    error "Cannot confirm write access to ${REPO} as ${login}. ${err_body}"
  fi
  echo "Collaborator permission: ${perm}"
  case "${perm}" in
    admin|maintain|write) ;;
    *)
      error "Token for ${login} cannot push to ${REPO} (permission=${perm}). Grant Contents: Write and retry."
      ;;
  esac
elif [[ "${can_push}" != "true" ]]; then
  error "Token for ${login} cannot push to ${REPO} (permissions.push=${can_push}). Grant Contents: Write and retry."
fi

echo "Checking git refs on ${REPO}..."
if ! gh api "repos/${REPO}/git/refs/heads/${BRANCH}" --jq .ref >/dev/null 2>"${ref_err}"; then
  err_body="$(cat "${ref_err}" 2>/dev/null || true)"
  if echo "${err_body}" | grep -Eqi 'Not Found|404'; then
    warn "${BRANCH} does not exist yet on ${REPO}. The first deploy will create it."
  else
    error "Cannot read git refs on ${REPO} (needed to create the deploy commit). ${err_body}"
  fi
else
  echo "Branch ${BRANCH} is readable."
  if gh api "repos/${REPO}/branches/${BRANCH}/protection" >/dev/null 2>/dev/null; then
    warn "${BRANCH} has branch protection. Deploy commits may be rejected if this token cannot bypass the rules."
  fi
fi

echo "Pages repository is reachable and the token can push. Deploy may proceed."
