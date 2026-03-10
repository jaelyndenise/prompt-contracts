# Prompt Contract: [Paginated Query Name]

## Inputs
- Table: [table name in Convex schema]
- Fields to return: [list fields, or "all"]
- Filter: [e.g., by userId, by status, by date range — or "none"]
- Sort: [field + direction, e.g., "createdAt descending"]
- Page size: [number of items per page, e.g., 20]
- Schema: [paste or reference the relevant schema definition]
- Existing files: [list any related queries, components, or hooks]

## Expected Output
- File: `convex/[queryName].ts` — Convex query using `.paginate()` with typed args
- File: `src/components/[ListComponent].tsx` — React component using `usePaginatedQuery` from `convex/react`
- Component renders: list of items, "Load More" button, empty state, loading state

## Constraints
- MUST use `.paginate(opts)` on the query — never `.collect()` on potentially large tables
- MUST accept `paginationOpts` as a query argument (Convex convention)
- MUST return `{ page, isDone, continueCursor }` — the standard Convex pagination shape
- MUST use `usePaginatedQuery` hook in the React component, NOT manual cursor management
- MUST validate filter arguments with `v.optional()` where filters are optional
- MUST use an index for filtering and sorting — never `.filter()` on unindexed fields
- MUST NOT fetch all records and paginate client-side
- MUST NOT use `useEffect` + `useState` to manage pagination state — `usePaginatedQuery` handles it

## Edge Cases
- Table is empty: show a meaningful empty state ("No [items] yet"), not a blank page
- Filter matches zero results: show "No results for [filter]" with a clear-filter option
- Cursor becomes invalid (data deleted between pages): Convex handles this gracefully, but verify the component doesn't crash
- User scrolls fast and triggers multiple loadMore calls: `usePaginatedQuery` deduplicates, but the "Load More" button should be disabled while loading
- Page size of 1: should still work correctly (edge case for testing)

## Acceptance Criteria
- [ ] First page loads with correct number of items (page size)
- [ ] "Load More" button fetches the next page and appends results
- [ ] `isDone` hides the "Load More" button when all results are loaded
- [ ] Filter restricts results to matching items only
- [ ] Empty table shows empty state, not a loading spinner forever
- [ ] Query uses an index — verified in `convex/schema.ts`
- [ ] Component shows a loading state on initial load
