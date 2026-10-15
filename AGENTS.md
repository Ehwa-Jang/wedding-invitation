<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the wedding invitation as a single static React page at `/`; browser-only interactions must not require a backend.
- Use dummy placeholder images from `public/dummy/` through the shared manifest in `src/lib/invitation-images.ts`; never hotlink or copy the reference site's photos. Swap photos by replacing files or editing the manifest.
- Define invitation styling centrally in `src/styles.css` and expose interactive styles through Button variants to keep the reference design consistent.
- Keep all invitation copy and date values in `src/lib/invitation-content.ts`; render lettering, calendar and decorations as HTML/CSS in `invitation-artwork.tsx` rather than flattened section images so they remain independently editable.
