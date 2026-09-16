# StudyPilot Identity, Permissions & Implementation Rules

## 1. Feature Preservation Invariant
- Never prune, redirect away, stub, or delete user-demanded features or routes under the guise of simplification or over-engineering review.
- Every route and feature specified must be fully implemented with interactive state and realistic flows.

## 2. Zero-Hallucination Product Invariant (Spec v2 §33)
- Do NOT invent new roles, authority levels, or automatic permissions.
- The three supported top-level roles are strictly: `Student`, `Teacher`, `Management`. (Super Admin / Principal is explicitly deferred).
- Pakistan-first: Academic hierarchy is strictly Board → Class → Stream/Program → Subject Combination → Roll Number.

## 3. Deterministic Role-Based Routing (Spec v2 §8, §19)
- A student must NEVER be routed into a teacher workspace.
- An unverified teacher must remain in Pending Verification (read-only) with privileged controls disabled.
- Unauthorized controls must never be presented as active. Never redirect users to another role's interface to handle permission limits.

## 4. Class Representative Authority (Spec v2 §13, §14)
- Each class has one Representative/Admin Teacher with membership authority (approve/reject join requests). Other verified teachers can post materials/announcements but cannot administer class membership.
