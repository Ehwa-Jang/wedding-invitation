// Dummy images. To swap a photo, replace the file in public/dummy/ (keeping the name)
// or point the slot below at a new URL. Components never reference image paths directly.
const dummy = (name: string) => `${import.meta.env.BASE_URL}dummy/${name}.svg`;

export const images = {
  cover: dummy("cover"),
  locket: [dummy("locket-groom"), dummy("locket-bride")],
  polaroid: dummy("collage"),
  groomFamily: dummy("groom-family"),
  brideFamily: dummy("bride-family"),
  // Small cut-out portraits around the family photo: [left, right] per family.
  cutouts: [
    [dummy("gallery-01"), dummy("gallery-02")],
    [dummy("gallery-03"), dummy("gallery-04")],
  ],
  letterBride: dummy("letter-bride"),
  letterGroom: dummy("letter-groom"),
  location: dummy("location"),
} as const;

export const gallery = Array.from({ length: 15 }, (_, index) =>
  dummy(`gallery-${String(index + 1).padStart(2, "0")}`),
);
