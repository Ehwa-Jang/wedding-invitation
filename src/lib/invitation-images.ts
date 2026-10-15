// Dummy images. To swap a photo, replace the file in public/dummy/ (keeping the name)
// or point the slot below at a new URL. Components never reference image paths directly.
const dummy = (name: string) => `/dummy/${name}.svg`;

export const images = {
  cover: dummy("cover"),
  collage: dummy("collage"),
  locketBride: dummy("locket-bride"),
  locketGroom: dummy("locket-groom"),
  groomFamily: dummy("groom-family"),
  brideFamily: dummy("bride-family"),
  letterBride: dummy("letter-bride"),
  letterGroom: dummy("letter-groom"),
  location: dummy("location"),
} as const;

export const gallery = Array.from({ length: 15 }, (_, index) => dummy(`gallery-${String(index + 1).padStart(2, "0")}`));
