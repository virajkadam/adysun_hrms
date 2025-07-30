# Memory Management Rules

## Purpose:
This @memories.md file is specifically for Cursor IDE to improve code writing and should always be referenced for better development assistance. The purpose of this @memories.md is to follow consistency without completely saying through prompt - even if user said same UI change, we should behind the hood follow the consistency and established UI, LOGICAL etc methods!!!

## Rules for Managing Memories:
1. **Always Read First**: Always read existing @memories.md before adding new memories
2. **No Self-Contradiction**: If new memories seem to contradict existing ones, keep both old and new memories
3. **Contradiction Marking**: Add ⚠️ danger emoji to highlight contradictory memories
4. **Memory Preservation**: Never delete existing memories, only add new ones
5. **Clear Separation**: Use horizontal rules (`---`) to separate different memories
6. **Consistency Check**: Always review for contradictions when adding new memories
7. **Header Management**: At the start/header of @memories.md, add the rules for memories. If memories contradict, keep both old and new entries and highlight contradictions with a danger emoji (⚠️)
8. **Session Inclusion**: Always remember to add the @memories.md to each chat and agent session of cursor IDE!
9. **Cursor IDE Reference**: The @memories.md is for Cursor IDE better code writing helpful file and cursor should always refer this!
10. **Behind-the-Scenes Consistency**: Follow established UI patterns, logical methods, and consistency rules automatically without needing to repeat in every prompt
11. **Pattern Reference & User Approval**: Always refer to established code patterns, best practices, suggestions to ask user does he accepts and grant or not - on that decider will choose the path!

## Resolution Rules:
- **Same Memory Exists**: If exact same memory already exists, skip adding duplicate
- **Similar Memory**: If similar intended memory exists but with different wording, keep both and mark with 🔄
- **Contradictory Memory**: If new memory contradicts existing one, keep both and mark with ⚠️
- **Enhanced Memory**: If new memory provides more detail to existing one, replace old with new and mark with ✨

---

The user prefers that joining dates across the entire project always be formatted as 'DD MMM YYYY' (e.g., 20 Jun 2025) using a reusable parsing method.

---

When providing rules changes, the assistant should first ask the user for their current rules, then add the new rule, and provide the complete updated rules.

---

The user prefers that the assistant create a /docs/rule.md file containing recent Firestore rules and always refer to it before providing any new rules.

---

The user prefers concise output, providing only the necessary parts of code rather than full verbose code dumps.

---

The user prefers a consistent UI pattern: display the value above its label, using established font size, card styles, and colors.

---

The user prefers always using formatDateToDayMonYear from @documentUtils.ts for date formatting, and parsing time into 12-hour format with Indian timezone handling.

---

The user prefers joining dates across the entire project formatted as 'DD MMM YYYY' (e.g., 20 Jun 2025) using a reusable parsing method, always using formatDateToDayMonYear from @documentUtils.ts and parsing time into 12-hour format with Indian timezone handling.

---

The user wants the assistant to always include the @memories.md file in every chat and agent session of the Cursor IDE.

---

The user prefers that tooltips should match the accent color of the button they are attached to - using the lighter accent color (like button background) rather than the darker base color (like button icon), following the pattern where button background is accent color and button icon is base color.

---

The user prefers the TableHeader component pattern with consistent three-column layout: Left (back button), Center (title), Right (action buttons), with stats section below showing Total/Active/Inactive counts, and optional filter dropdown with All/Active/Inactive options positioned between refresh button and search bar.

---

The user prefers a consistent 4-column grid layout (grid-cols-1 md:grid-cols-4 gap-4) for all form sections in create/view/edit screens across the project. Each section should be organized in groups of 4 fields, with longer fields like addresses or descriptions optionally spanning multiple columns using col-span classes. This applies to all form sections including personal details, contact information, documents, and educational details.

---

The user prefers the TableHeader component pattern for add/edit screens with consistent structure: title, back button (left), action button (right), no stats/search/filter, headerClassName="px-6 py-6", and form buttons layout with Cancel (left) and Add/Save button (right) using justify-between layout with px-6 py-3 padding.

---

The user requires that when implementing Tanstack Query, always use globally declared configuration from @lib/queryClient.ts and never declare individual staleTime, gcTime, or retry values in custom hooks. All query configurations should inherit from the global QueryClient defaultOptions to maintain consistency across the application.