# TODO - WCAG & UX Fixes

## Step 1 (Fix #1: Hero CTA contrast)
- [x] Update `src/components/HeroSection.tsx`: change “View My Projects” button from `bg-gradient-primary` to a solid high-contrast `bg-primary`.

## Step 2 (Fix #2: consistent section spacing)
- [x] Add a shared spacing utility class (or reuse existing `section-spacing`) in `src/index.css`.
- [ ] Update all section components (`HeroSection`, `AboutSection`, `SkillsSection`, `ProjectsSection`, `InternshipsSection`, `CertificationsSection`, `ContactSection`) to use the shared spacing utility instead of inconsistent `py-*`/`min-h-screen`.
- [ ] Ensure sections keep their intended layout (avoid breaking hero min-height).

## Step 3 (Fix #3: navigation label clarity)
- [x] Update `src/components/Navigation.tsx` to display descriptive button labels instead of `</Name>`.
- [x] Update aria-labels accordingly.

## Step 4 (Verification)
- [ ] Run `npm test` / `npm run build` (or at least `npm run lint` if available).
- [ ] Manual visual check: hero CTA readability, spacing consistency, navigation label clarity.

